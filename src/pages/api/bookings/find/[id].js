import clientPromise from '@/util/mongo';
import { ObjectId } from 'mongodb';
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      console.log("finding booking", req.query)
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection('bookings');
      const { id } = req.query;
      const booking = await collection.findOne({ _id: new ObjectId(id) });
      res.status(200).json({ ...booking});
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(405).json({ message: 'Something went wrong', error: e });
  }
}
