import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  name: null,
  email: null,
  profile_pic: null,
  token: null,
  onlineUser: [],
  socketConnection: null,
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (!action.payload || !action.payload._id) {
        console.error("Invalid payload for setUser:", action.payload);
        return;
      }
      state._id = action.payload._id;
      state.name = action.payload.name || "";
      state.email = action.payload.email || "";
      state.profile_pic = action.payload.profile_pic || "";
      console.log("User state updated:", state);
    },
    setToken: (state, action) => {
      if (!action.payload) {
        console.error("Invalid token payload:", action.payload);
        return;
      }
      state.token = action.payload;
      console.log("Token updated:", state.token);
    },
    logout: (state) => {
      console.log("Logging out user:", state);
      state._id = "";
      state.name = "";
      state.email = "";
      state.profile_pic = "";
      state.token = "";
      state.socketConnection = null;
      state.onlineUser = [];
    },
    setOnlineUser: (state, action) => {
      if (!Array.isArray(action.payload)) {
        console.error("Invalid onlineUser payload:", action.payload);
        return;
      }
      state.onlineUser = action.payload;
      console.log("Online users updated:", state.onlineUser);
    },
    setSocketConnection: (state, action) => {
      if (!action.payload) {
        console.error("Invalid socketConnection payload:", action.payload);
        return;
      }
      state.socketConnection = action.payload;
      console.log("Socket connection updated:", state.socketConnection);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout, setOnlineUser, setSocketConnection } =
  userSlice.actions;

export default userSlice.reducer;
