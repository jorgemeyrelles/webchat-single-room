// const moment = require('moment');

const users = [];

// add users
const userJoin = (id, username) => {
  let lowerCaseName = '';
  (username === '') ? lowerCaseName = id.substr(1, 16) : lowerCaseName = username.trim().toLowerCase();

  const existUser = users.find((e) => { e.nickname === lowerCaseName });

  if (existUser) return { error: 'User is already taken' };

  const user = {
    id,
    nickname: lowerCaseName,
  };
  users.push(user);
  return user;
};

// get user by id
const getUserById = (id) => {
  return users.find((e) => e.id === id);
};

// remove user by id
const removeOne = (id) => {
  const index = users.findIndex((e) => e.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

// get all user in room
const getAllUsers = () => {
  return users.filter((e) => e);
};

module.exports = { userJoin, removeOne, getAllUsers, getUserById };
