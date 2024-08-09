require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Connection = require('./db.js');
const Chat = require('./models/Chat.js');

const app = express();
app.use(express.json());

// Establish MongoDB connection
Connection();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("connected");

    const loadMessages = async () => {
        try {
            const messages = await Chat.find().sort({ timestamp: 1 }).exec(); // Ensure timestamp is a valid field
            socket.emit('chat', messages);
        } catch (err) {
            console.error("Error loading messages:", err);
        }
    };

    loadMessages();

    socket.on('newMessage', async (msg) => {
        try {
            const newMessage = new Chat(msg);
            await newMessage.save();
            io.emit('message', newMessage); // Emit the saved message
        } catch (err) {
            console.error("Error saving new message:", err);
        }
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});

server.listen(3002, () => {
    console.log("Server running on port 3002");
});
