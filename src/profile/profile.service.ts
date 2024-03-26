import { Injectable } from '@nestjs/common';
import { admin } from 'src/firebase/firebase.service';

@Injectable()
export class ProfileService {
  private firestore = admin.firestore();

  async getUserBatch(uids: string[]): Promise<any> {
    const userRefs = this.firestore.collection('profile');

    // Using the 'whereIn' method to query documents with the specified user IDs
    const querySnapshot = await userRefs.where('uid', 'in', uids).get();

    // Mapping the documents to their data
    const usersData = querySnapshot.docs.map((doc) => doc.data());

    return usersData;
  }

  async getProfile(uid: string): Promise<any> {
    try {
      if (uid && uid.length > 0) {
        const userRef = this.firestore.collection('profile').doc(uid);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
          // User not found, handle accordingly
          console.log('User not found');
          return null;
        }
        return userSnapshot.data();
      }
      return null;
    } catch (error) {
      console.log(error);
      throw error;
    }

    // Return user data
  }

  async updateProfile(uid: string, pictureUrl: string): Promise<any> {
    const userRef = this.firestore.collection('profile').doc(uid);
    if (userRef) {
      await userRef.update({
        pictureUrl,
      });
    }
  }

  async searchUsers(query: string): Promise<any[]> {
    try {
      const usersCollection = this.firestore.collection('profile');

      // Convert the query to lowercase for case-insensitive search
      const lowerQuery = query.toLowerCase();

      // Create a range for searching substrings
      const startAt = lowerQuery;
      const endAt = lowerQuery + '\uf8ff';

      // Use Firestore query for partial or approximate matches on displayName or email
      const querySnapshot = await usersCollection
        .where('displayName', '>=', startAt)
        .where('displayName', '<=', endAt)
        .get();

      const users: any[] = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        users.push(user);
      });

      // Perform a separate query for email
      const emailQuerySnapshot = await usersCollection
        .where('email', '>=', startAt)
        .where('email', '<=', endAt)
        .get();

      emailQuerySnapshot.forEach((doc) => {
        const user = doc.data();
        if (!users.some((u) => u.uid === user.uid)) {
          users.push(user);
        }
      });

      return users;
    } catch (error) {
      // Handle errors appropriately (e.g., log or throw)
      console.error('Error searching users:', error);
      throw error;
    }
  }
}
