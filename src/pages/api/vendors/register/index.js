import clientPromise from '@/util/mongo';
import bcyrpt from 'bcrypt';
import short from 'short-uuid';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection('vendors');
      const id = short.generate();
      const tracking = [
        {
          type: 'USER_SIGNUP',
          date: new Date(),
          entityId: id,
          doer: id,
        },
      ];
      const data = req.body;
      const salt = await bcyrpt.genSalt(10);
      const hash = await bcyrpt.hash(data.password, salt);
      data.hash = hash;
      data.confirmPassword = undefined;
      data.tracking = tracking;
      data.onlineBookingsCommision = 10;
      data.stylistCommision = 10;
      data.walkInBookingsCommision = 10;
      data.status = 'active';
      data.rating = 0;
      data.id = id;
      data.bio = "";
      data.bannerImages = [];

      const result = await collection.insertOne(data);

      res.status(200).json(result);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(405).json({ message: 'Something went wrong', error: e });
  }
}
