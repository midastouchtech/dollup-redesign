import clientPromise from '@/util/mongo';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      console.log("finding vendor", req.query)
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection('vendors');
      const { id } = req.query;
      const vendor = await collection.findOne({ id });
      const services = await db.collection('services').find({ "vendor.id": id }).toArray();
      const stylists = await db.collection('stylists').find({ "vendor.id": id }).toArray();
      const products = await db.collection('products').find({ "vendor.id": id }).toArray();
      res.status(200).json({ ...vendor, services, stylists, products });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(405).json({ message: 'Something went wrong', error: e });
  }
}
