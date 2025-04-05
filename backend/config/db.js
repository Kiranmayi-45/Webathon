// config/db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let client;
let db;

const connectDB = async () => {
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    console.log(`MongoDB connected: ${dbName}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return db;
};

module.exports = { connectDB, getDB };
