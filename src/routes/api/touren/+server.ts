import { json } from '@sveltejs/kit';
import { getDb } from '$lib/db';

export async function GET() {
  try {
    console.log('API wurde aufgerufen');
    const db = await getDb();
    console.log('DB verbunden');
    const touren = await db.collection('touren').find({}).toArray();
    console.log('Touren gefunden:', touren.length);
    return json(touren);
  } catch (error) {
    console.error('Fehler:', error);
    return json({ error: String(error) }, { status: 500 });
  }
}