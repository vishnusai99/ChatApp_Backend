// src/auth/auth.service.ts

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service'; // Assuming you have Firestore service
import { admin } from 'src/firebase/firebase.service';
import { User } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async signUp(email: string, password: string, name: string): Promise<User> {
    // You can use Firebase Authentication for signup
    // Example: firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = await admin.auth().createUser({
      email: email,
      password: password,
    });
    // Create user profile in Firestore
    await this.firestoreService.createProfile(
      user.uid,
      user.email,
      name,
    );
    // await admin.auth().
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  }

  async signIn(email: string, password: string): Promise<void> {
    // You can use Firebase Authentication for signin
    // Example: firebase.auth().signInWithEmailAndPassword(email, password);

    // Check if the user exists in Firestore
    const user = await this.firestoreService.getProfile(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Additional checks if needed

    // Return user details
    return user;
  }
}
