import clientPromise from '@/util/mongo';

export default async function handler(req, res) {
  try {
    console.log('req.method', req.method, 'req.query', req.query, 'req.body', req.body)
    if (req.method === 'GET') {
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection('vendors');

      // Use toArray to convert the cursor to an array
      const allVendors = await collection.aggregate([
        {
          $lookup: {
            from: 'services',
            let: { vendorId: '$id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$vendor.id', '$$vendorId'] },
                },
              },
            ],
            as: 'services',
          },
        },
        {
          $project: {
            password: 0, // Exclude the password field
            tracking: 0, // Exclude the tracking field
            commissionType: 0,
            hash: 0,
            onlineBookingsCommision: 0,
            stylistCommision: 0,
            walkInBookingsCommision: 0,
          },
        },
      ]).toArray();

      console.log("found vendors", allVendors.length)
      res.status(200).json(allVendors);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Internal Server Error', error: e });
  }
}
