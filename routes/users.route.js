const usersService = require('../services/users.service');
const { v4: uuid } = require('uuid');
const axios = require('axios');

const COOKIE_NAME = "facts-cookie-id";

module.exports = (app) => {
  app.get('/', validateCookie, getFactsData);
  app.get('/myfacts', getUserFacts);
  app.post('/savefact', addFact);
  app.put('/removefact', removeFact);
}


function validateCookie(req, res, next) {
  if (!req.cookies[COOKIE_NAME]) {
    const newUniqueId = uuid();
    res.cookie(COOKIE_NAME, newUniqueId, { expires: new Date(Date.now() + 1000*60*60*24*30)}); // +1 month from now
    
    // write new user to file
    usersService.addUser(newUniqueId);
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

function getUserFacts(req, res) {
  const userCookieId = req.cookies[COOKIE_NAME];

  res.send(usersService.getUserFacts(userCookieId))
}

function addFact(req, res) {
  const userCookieId = req.cookies[COOKIE_NAME];
  
  usersService.addFactToUser(userCookieId, req.body.txt);
  res.end('Saved Successfully');
}

function removeFact(req, res) {
  const userCookieId = req.cookies[COOKIE_NAME];

  usersService.removeFactFromUser(userCookieId, req.body.txt);
  res.end('Removed Successfully');
}
