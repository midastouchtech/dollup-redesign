import clientPromise from "@/util/mongo";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      console.log("req.method", req.method, "req.query", req.query);
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
      const collection = db.collection("categories");
      const all = await collection
        .aggregate([
          {
            $lookup: {
              from: "subCategories",
              localField: "id",
              foreignField: "category.id",
              as: "subCategories",
            },
          },
          {
            $project: {
              "subCategories.category": 0,
            },
          },
        ])
        .toArray();
      const data = all;
      res.status(200).json(data);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (e) {
    console.log(e)
    res.status(405).json({ message: "Something went wrong", error: e });
  }
}
