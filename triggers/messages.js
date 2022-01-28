const moment = require('moment');

const msgs = [];
// return informations about message and user by object
const formatMessage = ({ id, nickname, text }) => {
  const one = {
    text,
    nickname,
    timestamp: moment().format('DD/MM/yyyy hh:mm:ss A'),
    id,
  };
  msgs.push(one);
  return one;
};

// get all messages until now
const getAllMsg = () => {
  return msgs;
};

// return all messages of specific user
const getMessageById = (user) => {
  const nick = msgs.find((e) => (e.nickname === user.nickname && e.id === user.id));
  // console.log(nick);
  const msg = msgs.filter((e) => e.id === nick.id).map((e) => (
    { [e.timestamp]: e.text }
  ));
  return {
    [nick.nickname]: msg,
  };
};

// remove informations about a specific user by id
const deleteOneMsg = (id) => {
  const index = msgs.findIndex((e) => e.id === id);

  if (index !== -1) return msgs.splice(index, 1)[0];
};

module.exports = { formatMessage, getMessageById, deleteOneMsg, getAllMsg };
