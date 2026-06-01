import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

async function getDb() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  return client.db('trailbuddy');
}

export const GET: RequestHandler = async () => {
  try {
    const db = await getDb();
    const eintraege = await db
      .collection('eintraege')
      .find({})
      .sort({ erstelltAm: -1 })
      .toArray();
    return json(eintraege);
  } catch (e) {
    console.error('GET /api/eintraege Fehler:', e);
    return json({ error: 'Fehler beim Laden' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const db = await getDb();
    const result = await db.collection('eintraege').insertOne({
      tourId: body.tourId ?? null,
      tourName: body.tourName,
      datum: body.datum,
      notiz: body.notiz ?? '',
      bewertung: body.bewertung ?? 3,
      erstelltAm: new Date().toISOString()
    });
    return json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error('POST /api/eintraege Fehler:', e);
    return json({ error: 'Fehler beim Speichern' }, { status: 500 });
  }
};