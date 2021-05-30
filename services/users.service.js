const fs = require('fs');

const DB_PATH = './data/users.json';

module.exports = {
  addUser,
  getUserFacts,
  addFactToUser,
  removeFactFromUser
}

// local helpers functions
function _getDataFromFile() {
  return JSON.parse(fs.readFileSync(DB_PATH));
}
function _writeToFile(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// functions that handles the DB file
function addUser(userId) {
  const data = _getDataFromFile();
  data[userId] = [];

  _writeToFile(data);
}

function getUserFacts(userId) {
  const data = _getDataFromFile();
  return data[userId]
}

function addFactToUser(userId, fact) {
  const data = _getDataFromFile();
  if (data[userId].includes(fact)) return;
  data[userId].push(fact);

  _writeToFile(data);
}

function removeFactFromUser(userId, fact) {
  const data = _getDataFromFile();
  data[userId] = data[userId].filter(str => str !== fact);

  _writeToFile(data);
}

