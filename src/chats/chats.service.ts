// Chats.service.ts
import { Injectable } from '@nestjs/common';
import { admin } from 'src/firebase/firebase.service';
import { MessagesService } from 'src/messages/messages.service';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class ChatsService {
  private firestore = admin.firestore();
  constructor(
    private messagesService: MessagesService,
    private profileService: ProfileService,
  ) {}

  async getChatById(chatId: string): Promise<any> {
    try {
      const chatDoc = await this.firestore
        .collection('Chats')
        .doc(chatId)
        .get();
      return chatDoc.exists ? chatDoc.data() : null;
    } catch (error) {
      console.error('Error fetching chat by ID:', error);
      throw new Error('Error fetching chat by ID');
    }
  }

  async getKnownUsers(uid: string): Promise<any> {
    try {
      const connectionsSnapshot = await this.firestore
        .collection(`KnownUsers`)
        .doc(uid)
        .collection('Connections')
        .get();

      const connectedUserIds = connectionsSnapshot.docs.map((doc) => doc.id);

      return await this.profileService.getUserBatch(connectedUserIds);
    } catch (error) {
      console.error('Error fetching known users', error);
      throw new Error('Error fetching known users');
    }
  }

  async createChat(
    participant1UID: string,
    participant2UID: string,
  ): Promise<any> {
    const chatId = `${participant1UID}_${participant2UID}`;
    try {
      // Add a connection from participant1UID to participant2UID
      await this.firestore
        .collection('KnownUsers')
        .doc(participant1UID)
        .collection('Connections')
        .doc(participant2UID)
        .set({ uid: participant2UID });

      // Add a connection from participant2UID to participant1UID if needed
      await this.firestore
        .collection('KnownUsers')
        .doc(participant2UID)
        .collection('Connections')
        .doc(participant1UID)
        .set({ uid: participant1UID });

      // Create a chat document
      await this.firestore
        .collection('Chats')
        .doc(chatId)
        .set({ participants: [participant1UID, participant2UID] });

      return { chatId };
    } catch (error) {
      console.error('Error creating chat:', error);
      throw new Error('Error creating chat');
    }
  }

  async getChatsForUser(uid: string): Promise<any[]> {
    // Implement logic to retrieve conversations for a user from Firestore
    const conversationsSnapshot = await this.firestore
      .collection('Chats')
      .where('participants', 'array-contains', uid)
      .get();

    // Assume conversationsSnapshot is the result of the query
    const conversations = [];
    for (const doc of conversationsSnapshot.docs) {
      const conversationId = doc.id;
      const conversationData = doc.data();
      const participants = conversationData.participants;
      const counterpartUserId = participants.find((st: string) => st !== uid);
      const counterpartUser =
        await this.profileService.getProfile(counterpartUserId);
      const messages =
        await this.messagesService.getMessagesByConversationId(conversationId);
      conversations.push({
        id: conversationId,
        ...conversationData,
        messages,
        counterpartUser,
      });
    }
    return conversations;
  }

  // Add additional services like message handling, user management, etc.
}
