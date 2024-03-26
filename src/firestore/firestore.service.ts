import { Injectable } from '@nestjs/common';
import { admin } from 'src/firebase/firebase.service';

@Injectable()
export class FirestoreService {
  private firestore = admin.firestore();

  async createProfile(
    uid: string,
    email: string,
    displayName: string,
  ): Promise<void> {
    const userRef = this.firestore.collection('profile').doc(uid);

    // Check if the user already exists
    const userSnapshot = await userRef.get();

    if (userSnapshot.exists) {
      // User already exists, handle accordingly
      console.log('User already exists');
      return;
    }

    // Create a new user document
    await userRef.set({
      uid,
      email,
      displayName
    });
  }

  async getProfile(email: string): Promise<any> {
    const userRef = this.firestore.collection('profile').doc(email);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      // User not found, handle accordingly
      console.log('User not found');
      return null;
    }

    // Return user data
    return userSnapshot.data();
  }

  
}
