import clientPromise from '@/util/mongo';

export default async function handler(req, res) {
  try {
    console.log('req.method', req.method, 'req.query', req.query, 'req.body', req.body)
    if (req.method === 'POST') {
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection('vendors');
      const { location, } = req.body;

      const searchLocation = {
        type: 'Point',
        coordinates: [location.lng, location.lat], 
      };
    
      const radiusInKilometers = 2000;
      const nearestVendorsWithServices = await collection.aggregate([
        {
          $geoNear: {
            near: searchLocation,
            distanceField: 'distance',
            maxDistance: radiusInKilometers * 1000, // Convert kilometers to meters
            spherical: true,
          },
        },
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
          $addFields: {
            services: {
              $filter: {
                input: '$services',
                as: 'service',
                cond: { $ne: ['$$service', null] },
              },
            },
          },
        },
        {
          $match: { 'services.0': { $exists: true } },
        },
        {
            $project: {
              password: 0, // Exclude the password field
              tracking: 0, // Exclude the tracking field
              commissionType:0,
              hash:0,
              onlineBookingsCommision:0,
              stylistCommision:0,
              walkInBookingsCommision:0,
            },
          },
      ]).toArray();
      console.log('nearestVendorsWithServices', nearestVendorsWithServices.length)
        res.status(200).json(nearestVendorsWithServices);

    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (e) {
    console.log(e);
    res.status(405).json({ message: 'Something went wrong', error: e });
  }
}
