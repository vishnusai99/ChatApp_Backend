// messages.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { admin } from 'src/firebase/firebase.service';
import { ReplyTo } from './dto/reply-to.dto';

@Injectable()
export class MessagesService {
  private firestore = admin.firestore();
  constructor(
    @Inject('PUB_SUB')
    private pubSub: PubSub,
  ) {}

  async getMessagesByConversationId(conversationId: string): Promise<any[]> {
    try {
      const snapshot = await this.firestore
        .collection('messages')
        .where('chatId', '==', conversationId)
        .get();

      const messages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        messageId: doc.id,
      }));
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  }

  async createMessage(
    chatId: string,
    senderId: string,
    content: string,
    timestamp: string,
    type: string,
    receiverId: string,
    replyTo: ReplyTo,
  ): Promise<any> {
    try {
      const messageRef = await this.firestore.collection('messages').add({
        senderId,
        content,
        timestamp,
        chatId,
        type,
        replyTo,
      });

      const newMessage = await messageRef.get();
      console.log('published');
      await this.pubSub.publish('messageCreated', {
        ...newMessage.data(),
        receiverId,
        messageId: newMessage.id,
      });
      return newMessage.data();
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  }

  async bulkMarkAsRead(ids: string[]): Promise<any> {
    try {
      const batch = this.firestore.batch();
      ids.forEach((_id) => {
        const messageRef = this.firestore.collection('messages').doc(_id);
        batch.update(messageRef, { read: true });
      });

      return await batch.commit();
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  }

  // Add more methods for updating or querying messages as needed
}
