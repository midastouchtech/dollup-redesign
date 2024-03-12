
import clientPromise from '@/util/mongo';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection('bookings');
      const allbookings = await collection.find({}, {projection: {_id: 1}}).toArray();
      res.status(200).json(allbookings);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Internal Server Error', error: e });
  }
}
