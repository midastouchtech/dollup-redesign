import clientPromise from "@/util/mongo";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            console.log("req.method", req.method, "req.query", req.query);
        console.log("req.method", req.method, "req.query", req.query);
        const client = await clientPromise;
        const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
        const collection = db.collection("bookings");
        const data = req.body;
        const result = await collection.insertOne(data);
        const bookingId = result.insertedId;
        res.status(200).json({ message: "Booking created", id:bookingId });
        }
    } catch (e) {
        console.log(e)
        res.status(405).json({ message: "Something went wrong", error: e });
    }
}