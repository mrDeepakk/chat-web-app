const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors= require('cors')

const app = express();

app.use(cors({
    origin: '*'
}));

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('sendMessage', (message) => {
        io.emit('message', message); // Broadcast the message to all connected clients
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});