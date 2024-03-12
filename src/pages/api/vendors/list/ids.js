
import clientPromise from '@/util/mongo';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection('vendors');
      const allVendors = await collection.find({}, {projection: {id: 1, _id: 0}}).toArray();
      res.status(200).json(allVendors);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Internal Server Error', error: e });
  }
}
