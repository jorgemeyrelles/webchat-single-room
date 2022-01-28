const { formatMessage, getMessageById, deleteOneMsg, getAllMsg } = require('../triggers/messages');

const { userJoin, getUserById, removeOne, getAllUsers } = require("../triggers/user");

module.exports = (io) => io.on('connection', (socket) => {
  userJoin(socket.id, '');
  // greetings for new user joined
  io.emit('serverName', { message: getAllUsers() });
  // return saved messages
  io.emit('serverAllMessages', { message: getAllMsg() });
  // socket.on('saved', (all) => all);
  // welcome chatroom
  socket.emit('message', `Seu nickname temporário é ${socket.id.substr(1, 16)}\n
    Seja bem vindo(a) ao web chat\n
    OBS: Você pode trocar seu nickname no campo ao lado!!!`);
  // welcome to new member at room
  socket.broadcast.emit('serverMessage', { message: `${socket.id.substr(1, 16)} entrou na sala!` });
  // getting all users within room
  io.emit('userServer', { users: getAllUsers() });
  // message sent
  socket.on('mensagem', (msg) => {
    // getting user registered
    const user = getUserById(socket.id);
    // saving messages with timestamp
    const format = formatMessage({id: socket.id, nickname: user.nickname, text: msg});
    // const get = getMessageById(format);
    io.emit('serverMessage', {
      message: `${format.timestamp} ${format.nickname}: ${format.text}`
    });
    // console.log(get);
    // console.log(`Alguém enviou a msg: ${formatMessage({id: socket.id, nickname: user.nickname, text: msg}).nickname}`);
  });

  socket.on('name', (name) => {
    // remove the old name from side list
    removeOne(socket.id);
    // update the user object
    const user = userJoin(socket.id, name);
    // send all users updated to reload side list with names
    io.emit('userServer', { users: getAllUsers() });
    // send the name of user who is into that chat
    const format = formatMessage({ id: socket.id, nickname: name, text: `Agora o ${user.id.substr(1, 16)} se chama ${name}` })
    io.emit('serverMessage', {
      message: `${format.timestamp} ${format.nickname}: ${format.text}`
    });
    io.emit('serverName', { message: getAllUsers() });
  });

  socket.on('disconnect', () => {
    // remove one user from list
    const user = removeOne(socket.id);
    const msg = deleteOneMsg(socket.id);
    // alert about exit user
    io.emit('serverMessage', { message: `${socket.id.substr(1, 16)} saiu da conversa.` });
    // sending user list updated
    io.emit('userServer', { users: getAllUsers() });
  });

});
