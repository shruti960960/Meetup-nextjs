import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://Shruti:8YWnSGRcyOLd1AUc@cluster0.egi3lsf.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db(); 
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    client.close();

    res.status(201).json({ message: "Meetup Inserted" });
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default handler;
