import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);

let isConnected = false;

export async function getDb() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client.db('trailbuddy');
}