const usersService = require('./users.service');
const axios = require('axios');

const COOKIE_NAME = "dogs-facts-cookie-id";

module.exports = {
  validateCookie,
  getFactsData,
  getUserFacts,
  addFact,
  removeFact
}

async function validateCookie(req, res, next) {
  if (!req.cookies[COOKIE_NAME]) {
    const newUserId = await usersService.addUser({ facts: [] })
    res.cookie(COOKIE_NAME, newUserId, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) }); // +1 month from now
  }
  next();
}

async function getFactsData(req, res) {
  try {
    const API_URL = 'https://dog-api.kinduff.com/api/facts?number=6';
    const facts = await axios.get(API_URL)
      .then(res => res.data.facts);
    res.send({ facts })
  }
  catch (err) {
    res.status(500).send(err);
  }
}

async function getUserFacts(req, res) {
  const userCookieId = req.cookies[COOKIE_NAME];
  const userFacts = await usersService.getUserFacts(userCookieId)
  res.send(userFacts);
}

// ?? should be async?
function addFact(req, res) {
  const userCookieId = req.cookies[COOKIE_NAME];

  usersService.addFactToUser(userCookieId, req.body.txt);
  res.end('Saved Successfully');    // ??? why do we need that?
}

// ?? should be async?
function removeFact(req, res) {
  const userCookieId = req.cookies[COOKIE_NAME];

  usersService.removeFactFromUser(userCookieId, req.body.txt);
  res.end('Removed Successfully');    // ??? why do we need that?
}
