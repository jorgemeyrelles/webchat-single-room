const express = require("express");
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const path = require('path');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

app.use(cors());

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

require('./sockets/socket')(io);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo => ${PORT}`);
});
