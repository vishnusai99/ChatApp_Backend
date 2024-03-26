import * as admin from 'firebase-admin';

const serviceAccount = require('../../serviceAccountConfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: `${process.env.BUCKET_URL}`,
});

const firestore = admin.firestore();
const bucket = admin.storage().bucket();
export { admin, firestore, bucket };
