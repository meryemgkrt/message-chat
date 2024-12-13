const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const generateToken = require("../helpers/generateToken");
const UserModel = require("../models/UserModel");
const {
  ConversationModel,
  MessageModel,
} = require("../models/ConversationModel");
const getConversation = require("../helpers/getConvection");
const { emit } = require("process");

const app = express();

/***socket connection */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

/***
 * socket running at http://localhost:8081/
 */

//online user
const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("connect User ", socket.id);

  const token = socket.handshake.auth.token;

  //current user details
  let user;
  try {
    user = await generateToken(token);
    if (!user || !user._id) {
      console.error("Invalid user data from token");
      return socket.disconnect(true);
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return socket.disconnect(true);
  }

  //create a room
  socket.join(user?._id.toString());
  onlineUser.add(user?._id?.toString());

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("message-page", async (userId) => {
    try {
      console.log("userId", userId);
      const userDetails = await UserModel.findById(userId).select("-password");

      if (!userDetails) {
        console.error("User not found");
        return;
      }

      const payload = {
        _id: userDetails?._id,
        name: userDetails?.name,
        email: userDetails?.email,
        profile_pic: userDetails?.profile_pic,
        online: onlineUser.has(userId),
      };
      socket.emit("message-user", payload);

      //get previous message
      const getConversationMessage = await ConversationModel.findOne({
        $or: [
          { sender: user?._id, receiver: userId },
          { sender: userId, receiver: user?._id },
        ],
      })
        .populate("messages")
        .sort({ updatedAt: -1 });

      socket.emit("message", getConversationMessage?.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  });

  //new message
  socket.on("new-message", async (data) => {
    let conversation = await ConversationModel.findOne({
      $or: [
        { sender: data.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender }, // user yerine data kullanıldı
      ],
    });

    if (!conversation) {
      const createConversation = new ConversationModel({
        sender: data.sender,
        receiver: data.receiver,
      });
      conversation = await createConversation.save();
    }
    const message = new MessageModel({
      text: data.text,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      msgByUserId: data.sender, // user yerine data.sender kullanıldı
    });
    const savedMessage = await message.save();

    const updatedConversation = await ConversationModel.updateOne(
      { _id: conversation?._id },
      {
        $push: { messages: savedMessage?._id },
      }
    );

    const getConversationMessage = await ConversationModel.findOne({
      $or: [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender },
      ],
    }).populate("messages").sort({ updatedAt: -1 });

    io.to(data?.sender).emit("message", getConversationMessage?.messages);
    io.to(data?.receiver).emit("message", getConversationMessage?.messages);
  });

  /*  socket.on("new-message", async (data) => {
    try {
     

      if (!data?.sender || !data?.receiver) {
        console.error("Eksik gönderen veya alıcı bilgisi:", data);
        return;
      }

      let conversation = await ConversationModel.findOne({
        $or: [
          { sender: data.sender, receiver: data.receiver },
          { sender: data.receiver, receiver: data.sender },
        ],
      });

      if (!conversation) {
        console.log(
          "Mevcut konuşma bulunamadı. Yeni bir konuşma oluşturuluyor..."
        );
        conversation = new ConversationModel({
          sender: data.sender,
          receiver: data.receiver,
        });
        await conversation.save();
      }

      const message = new MessageModel({
        text: data.text || "",
        imageUrl: data.imageUrl || "",
        videoUrl: data.videoUrl || "",
        msgByUserId: data.sender,
      });
     

      const savedMessage = await message.save();

      conversation.messages.push(savedMessage._id);
      await conversation.save();

    

      const updatedConversation = await ConversationModel.findOne({
        $or: [
          { sender: data.sender, receiver: data.receiver },
          { sender: data.receiver, receiver: data.sender },
        ],
      })
        .populate("messages")
        .sort({ updatedAt: -1 });

      console.log("==== Güncellenmiş Konuşma ====");
      updatedConversation.messages.forEach((msg, index) => {
       
      });
     
      
      io.to(data.sender).emit("message", updatedConversation?.messages || []);
      io.to(data.receiver).emit("message", updatedConversation?.messages || []);

      const conversationSender = await getConversation(data.sender);
      const conversationReceiver = await getConversation(data.receiver);

      io.to(data.sender).emit("conversation", conversationSender);
      io.to(data.receiver).emit("conversation", conversationReceiver);
    } catch (error) {
      console.error("Yeni mesaj işlenirken hata oluştu:", error);
    }
  }); */

  //sidebar
  socket.on("sidebar", async (currentUserId) => {
    try {
      console.log("current user", currentUserId);

      const conversation = await getConversation(currentUserId);

      socket.emit("conversation", conversation);
    } catch (error) {
      console.error("Error fetching sidebar:", error);
    }
  });

  socket.on("seen", async (msgByUserId) => {
    try {
      let conversation = await ConversationModel.findOne({
        $or: [
          { sender: user?._id, receiver: msgByUserId },
          { sender: msgByUserId, receiver: user?._id },
        ],
      });

      const conversationMessageId = conversation?.messages || [];

      await MessageModel.updateMany(
        { _id: { $in: conversationMessageId }, msgByUserId: msgByUserId },
        { $set: { seen: true } }
      );

      //send conversation
      const conversationSender = await getConversation(user?._id?.toString());
      const conversationReceiver = await getConversation(msgByUserId);

      io.to(user?._id?.toString()).emit("conversation", conversationSender);
      io.to(msgByUserId).emit("conversation", conversationReceiver);
    } catch (error) {
      console.error("Error handling seen:", error);
    }
  });

  //disconnect
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id?.toString());
    console.log("disconnect user ", socket.id);
  });
});

module.exports = {
  app,
  server,
};
