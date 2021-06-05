const dbService = require('../../services/db.service');

const { ObjectId } = require('mongodb');

module.exports = {
  addUser,
  getUserFacts,
  addFactToUser,
  removeFactFromUser
}

async function addUser(newUserData) {
  const collection = await dbService.getCollection();

  const res = await collection.insertOne(newUserData);
  return res.insertedId;
}

async function getUserFacts(userId) {  
  const collection = await dbService.getCollection();
  const user = await collection.findOne({"_id": ObjectId(userId)});
  return user.facts;
}

async function addFactToUser(userId, fact) {
  const collection = await dbService.getCollection();

  await collection.updateOne({"_id": ObjectId(userId)}, { $push: { facts: fact } });
}

async function removeFactFromUser(userId, fact) {
  const collection = await dbService.getCollection();

  await collection.updateOne({"_id": ObjectId(userId)}, { $pull: { facts: fact} }) ;
}
