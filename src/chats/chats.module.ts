import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [MessagesModule, ProfileModule],
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
