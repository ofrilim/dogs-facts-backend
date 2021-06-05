const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://limor:dogsfacts@cluster0.zzhhb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

const DB_NAME = "DOGS_FACTS_DB";
const COLLECTION_NAME = "users";
let DB_CONNECTION = null;


module.exports = {
  getCollection
}

async function getCollection() {
  const db = await connectToDb();
  return db.collection(COLLECTION_NAME);
}

async function connectToDb() {
  if (DB_CONNECTION) return DB_CONNECTION;

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    DB_CONNECTION = db;
    return db;
  } catch(err) {
    console.log('error connecting to MongoClient: ', err);
    throw err;
  } 
  // finally {
  //   await client.close();
  //   console.log('closed DB connection!!!!!!!!!')
  // }
}

// connectToDb().catch(console.error);