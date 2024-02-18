import clientPromise from "@/util/mongo";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection("bookings");
      const topServices = await collection.aggregate([
        {
          $group: {
            _id: "$service",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 10,
        },
      ]).toArray();
      res.status(200).json(topServices.map((service) => ({...service, ...service._id})));

    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (e) {
    console.log(e)
    res.status(405).json({ message: "Something went wrong", error: e });
  }
}