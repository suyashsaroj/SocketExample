const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
app.use(express.static(path.join(__dirname + '/index.html')));
var cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('connected successfully');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

server.listen(3001, () => {
  console.log('listening on http://localhost:3001');
});

setInterval(function () {
  var msg = Math.random();
  io.emit('message', msg);
  console.log(msg);
}, 10000);