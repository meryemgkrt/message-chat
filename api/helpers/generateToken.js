const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const generateToken = async (token) => {
  if(!token){
    return {
        message : "session out",
        logout : true,
    }
}

const decode = await jwt.verify(token,process.env.JWT_SECREAT_KEY)

const user = await UserModel.findById(decode.id).select('-password')
console.log("User from token:", user);


return user
};

module.exports = generateToken;
