const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const generateToken = require('../helpers/generateToken');
const UserModel = require('../models/UserModel');
const { profile } = require('console');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

const onlineUser = new Set();

io.on('connection', async (socket) => {
  console.log("User connected:", socket.id);

  const token = socket.handshake.auth.token;
  if (!token) {
    console.error("No token provided. Disconnecting...");
    return socket.disconnect(true);
  }

  let user;
  try {
    user = await generateToken(token);
    console.log("Token verified user:", user);
  } catch (error) {
    console.error("Token verification failed:", error);
    return socket.disconnect(true);
  }

  if (!user || !user._id) {
    console.error("Invalid user data from token");
    return socket.disconnect(true);
  }

  const userIdStr = user._id.toString();
  socket.join(userIdStr);
  onlineUser.add(userIdStr);

  io.emit("onlineUser", Array.from(onlineUser));
  console.log("Emitted online users:", Array.from(onlineUser));

  // Handle 'message-page' event
  socket.on('message-page', async (userId) => {
    console.log("UserId for message-page:", userId);
    try {
      const detailUser = await UserModel.findById(userId).select('-password');
      if (!detailUser) {
        console.error("User not found:", userId);
        return;
      }

      const isOnline = onlineUser.has(detailUser._id.toString());
      const payload = {
        _id: detailUser?._id,
        name: detailUser?.name,
        email: detailUser?.email,
        profile_pic: detailUser?.profile_pic,
        online: isOnline,
      };

      console.log("Payload for message-user:", payload);
      socket.emit('message-user', payload);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  });

  // Handle 'disconnect' event
  socket.on('disconnect', () => {
    if (user?._id) {
      onlineUser.delete(userIdStr);
      io.emit("onlineUser", Array.from(onlineUser));
      console.log(`User ${userIdStr} disconnected, updated online users:`, Array.from(onlineUser));
    } else {
      console.error("Invalid user ID on disconnect");
    }
  });
});

module.exports = { server, app };
