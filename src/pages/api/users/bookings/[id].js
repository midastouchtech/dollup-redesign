import clientPromise from '@/util/mongo';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      console.log("finding vendor", req.query)
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection('bookings');
      const { id } = req.query;
      const bookings = await collection.find({ "user._id": id }).toArray();
      res.status(200).json(bookings);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(405).json({ message: 'Something went wrong', error: e });
  }
}
