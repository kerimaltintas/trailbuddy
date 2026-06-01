import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MongoClient, ObjectId } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

async function getDb() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  return client.db('trailbuddy');
}

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    const db = await getDb();
    await db.collection('eintraege').deleteOne({ _id: new ObjectId(params.id) });
    return json({ success: true });
  } catch (e) {
    console.error('DELETE /api/eintraege/[id] Fehler:', e);
    return json({ error: 'Fehler beim Löschen' }, { status: 500 });
  }
};