/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const roomRoutes = require("./routes/rooms");
const User = require('./models/authModel');
const Message = require('./models/messagesModel');
const Room = require('./models/roomModel');
const { data } = require('autoprefixer');

//espress
const app = express();
const server = http.createServer(app);

//socketio
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Replace with your React application's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Allow credentials (if required)
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/rooms", roomRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/pbw_chatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const updateDataListMessage = (_id, time, username) => {

  Room.updateOne({ _id: _id }, { $set: { lastUpdate: time } })
    .exec()
    .then(() => {
      Room.find({ users: { $in: [username] } })
        .exec()
        .then((messages) => {
          io.emit('updateListRoom', messages);
        })
        .catch((err) => {
          console.error('Error retrieving messages:', err);
        });
    })
    .catch((err) => {
      console.error('Error updating lastUpdate:', err);
    });
};


//connect to socket server
io.on('connection', (socket) => {
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  
  socket.on('sendMessage', async (data) => {
    // console.log(data)
    const { roomId, message, time, username } = data;
  
    try {
      const sender = await User.findById(message.sender);
      
  
      if (!sender) {
        throw new Error('Invalid sender');
      }
  
      const newMessage = new Message({
        room: roomId,
        sender: message.sender,
        content: message.content,
      });
  
      // console.log(newMessage)
      await newMessage.save();

      updateDataListMessage(roomId, time, username)
  
      const populatedMessage = await Message.findById(newMessage._id).populate('sender', 'username');
  
      io.to(roomId).emit('receiveMessage', populatedMessage);
    } catch (error) {
      console.error('Error while sending message:', error);
    }
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.id} leave room ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  })
});


const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});