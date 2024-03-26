// messages.controller.ts
import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessage } from './dto/CreateMessage.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':conversationId')
  async getMessagesByConversationId(
    @Param('conversationId') conversationId: string,
  ): Promise<any> {
    return this.messagesService.getMessagesByConversationId(conversationId);
  }

  @Post()
  async createMessage(
    @Body()
    body: CreateMessage,
  ): Promise<any> {
    const {
      conversationId,
      senderId,
      content,
      timestamp,
      type,
      receiverId,
      replyTo,
    } = body;
    return this.messagesService.createMessage(
      conversationId,
      senderId,
      content,
      timestamp,
      type,
      receiverId,
      replyTo,
    );
  }
  @Put('bulk-mark-as-read')
  async bulkMarkAsRead(
    @Body()
    body: {
      ids: string[];
    },
  ): Promise<any> {
    return this.messagesService.bulkMarkAsRead(body.ids);
  }

  // Add more controller methods for updating or querying messages as needed
}
