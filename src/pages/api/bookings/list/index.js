import clientPromise from '@/util/mongo';

export default async function handler(req, res) {
  try {
    console.log('req.method', req.method, 'req.query', req.query, 'req.body', req.body)
    if (req.method === 'GET') {
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection('bookings');

      // Use toArray to convert the cursor to an array
      const allbookings = await collection.find({}).toArray();

      console.log("found bookings", allbookings.length)
      res.status(200).json(allbookings);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Internal Server Error', error: e });
  }
}
