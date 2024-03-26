// chats.controller.ts
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChat } from './dto/CreateChat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(':id')
  async getchatById(@Param('id') id: string): Promise<any> {
    return this.chatsService.getChatById(id);
  }

  @Get('get-chats-user/:uid')
  async getChatByuid(@Param('uid') uid: string): Promise<any> {
    return this.chatsService.getChatsForUser(uid);
  }

  @Get('get-known-users/:uid')
  async getKnownUsers(@Param('uid') uid: string): Promise<any> {
    return this.chatsService.getKnownUsers(uid);
  }

  @Post('create-new-chat')
  async createchat(@Body() body: CreateChat): Promise<any> {
    const { participant1UID, participant2UID } = body;
    return this.chatsService.createChat(participant1UID, participant2UID);
  }

  // Add more controller methods for updating or querying chats as needed
}
