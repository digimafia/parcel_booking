import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY))
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  const data = req.body;

  const doc = await db.collection("bookings").add({
    ...data,
    createdAt: new Date()
  });

  res.json({ id: doc.id });
}
