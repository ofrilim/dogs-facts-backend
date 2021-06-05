// const { validateCookie, getFactsData, getUserFacts, addFact, removeFact } = require('./user.controller');
const controller = require('./user.controller');

module.exports = (app) => {
  app.get('/', controller.validateCookie, controller.getFactsData);
  app.get('/myfacts', controller.getUserFacts);
  app.post('/savefact', controller.addFact);
  app.put('/removefact', controller.removeFact);
}
