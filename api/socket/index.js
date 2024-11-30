const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  },
});

const onlineUsers = new Set(); // Çevrimiçi kullanıcıları takip eder

// Socket.IO bağlantı işlemi
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Token doğrulama ve kullanıcı kimliği kontrolü
  const token = socket.handshake.auth.token;

  if (!token) {
    console.error("No token provided by client.");
    return socket.disconnect(); // Token yoksa bağlantıyı sonlandır
  }

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET); // Token'i doğrula
    console.log("Authenticated user:", user);

    // Kullanıcıyı çevrimiçi listeye ekle
    onlineUsers.add(user.id);
    io.emit("online", Array.from(onlineUsers));
    console.log("Emitted online users:", Array.from(onlineUsers));

    // Kullanıcı odaya katılır
    socket.join(user.id);
    console.log(`User ${user.id} joined room ${user.id}`);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return socket.disconnect(); // Token doğrulaması başarısızsa bağlantıyı sonlandır
  }

  // Kullanıcı bağlantısını kestiğinde
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    onlineUsers.delete(user.id); 
    io.emit("online", Array.from(onlineUsers)); 
    console.log("Emitted online users after disconnect:", Array.from(onlineUsers));
  });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
