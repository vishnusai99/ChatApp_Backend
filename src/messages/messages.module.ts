import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PubSub } from 'graphql-subscriptions';
import { MessagesResolver } from './messages.resolver';

@Module({
  providers: [
    MessagesService,
    MessagesResolver,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  controllers: [MessagesController],
  exports: [MessagesService, 'PUB_SUB'],
})
export class MessagesModule {}
