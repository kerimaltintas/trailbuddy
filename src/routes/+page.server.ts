import { getDb } from '$lib/db';

export async function load() {
  const db = await getDb();
  const touren = await db.collection('touren').find({}).limit(3).toArray();

  return {
    touren: touren.map(t => ({
      ...t,
      _id: t._id.toString()
    }))
  };
}