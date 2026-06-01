import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

async function getDb() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  return client.db('trailbuddy');
}

export const GET: RequestHandler = async ({ url }) => {
  const userId = url.searchParams.get('userId') ?? 'anonym';
  try {
    const db = await getDb();
    const profil = await db.collection('profile').findOne({ profilId: userId });
    return json(profil ?? { persona: null, fitnessLevel: 2 });
  } catch (e) {
    return json({ persona: null, fitnessLevel: 2 });
  }
};

export const PUT: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const userId = body.userId ?? 'anonym';
    const db = await getDb();
    await db.collection('profile').updateOne(
      { profilId: userId },
      {
        $set: {
          persona: body.persona,
          fitnessLevel: Number(body.fitnessLevel),
          profilId: userId,
          aktualisiertAm: new Date().toISOString()
        }
      },
      { upsert: true }
    );
    return json({ success: true });
  } catch (e) {
    return json({ error: 'Fehler beim Speichern' }, { status: 500 });
  }
};