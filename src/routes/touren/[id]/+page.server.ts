import { getDb } from '$lib/db';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const db = await getDb();
  
  const tour = await db.collection('touren').findOne({ 
    _id: new ObjectId(params.id) 
  });

  if (!tour) {
    throw error(404, 'Tour nicht gefunden');
  }

  return {
    tour: {
      ...tour,
      _id: tour._id.toString()
    }
  };
}