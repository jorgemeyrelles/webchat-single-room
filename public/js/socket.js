const socket = window.io();

// socket.emit('joinRoom', { nickname: socket.id.substr(1, 16) })

const form = document.querySelector('#form');
const inputMessage = document.querySelector('#mensagemInput')

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputMessage.value === '') return false;
  socket.emit('mensagem', inputMessage.value);
  inputMessage.value = '';
  return false;
});

const input = document.querySelector('#nameInput');
const inputNameTag = document.querySelector('#name-tag')

input.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputNameTag.value === '') return false;
  socket.emit('name', inputNameTag.value);
  inputNameTag.value = '';
  inputNameTag.setAttribute('disabled', 'true');
  return false;
});

const createMessage = (message) => {
  const messageUl = document.querySelector('#mensagens');
  const li = document.createElement('li');
  li.className = 'messages';
  li.innerText = message;
  messageUl.appendChild(li);
  window.scrollTo(0, document.querySelector('#div-message').scrollHeight);
};

const inputName = (name) => {
  const div = document.querySelector('#input-name');
  // const h3 = document.createElement('h3');
  const user = name.filter((e) => e.id === socket.id);
  // console.log(user);
  div.innerHTML = `<h3>Olá ${user[0].nickname}</h3>`;
  // div.appendChild(h3);
  // console.log(div);
};

const allOnline = (name) => {
  const all = document.querySelector('#users');
  // console.log(name);
  let send = name.map((e) => `<li>${e.nickname}</li>`).join('');
  all.innerHTML = `${send}`;
};

const renderAll = (object) => {
  const messageUl = document.querySelector('#mensagens');
  object.forEach((e) => {
    const li = document.createElement('li');
    li.className = 'saved';
    li.innerText = `${e.timestamp} ${e.nickname}: ${e.text}`;
    messageUl.appendChild(li);
    // console.log(li);
    window.scrollTo(0, document.querySelector('#div-message').scrollHeight);
  });
};

socket.on('message', (message) => createMessage(message));
socket.on('serverMessage', (object) => createMessage(object.message));
socket.on('userServer', ({ users }) => allOnline(users));
socket.on('serverName', (name) => inputName(name.message));
socket.on('serverAllMessages', (object) => renderAll(object.message));
