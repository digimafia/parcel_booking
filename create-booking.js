import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY))
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const data = req.body;

  const doc = await db.collection("bookings").add({
    name: data.name,
    phone: data.phone,
    address: data.address,
    status: "pending",
    createdAt: new Date()
  });

  res.status(200).json({ id: doc.id });
}
