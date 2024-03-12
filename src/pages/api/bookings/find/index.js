import clientPromise from '@/util/mongo';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection('bookings');
      const { id } = req.query;
      const data = await collection.findOne({ _id: id });
      res.status(200).json(data);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(405).json({ message: 'Something went wrong', error: e });
  }
}
