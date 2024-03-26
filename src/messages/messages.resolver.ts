import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Message } from './messages.model';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    @Inject('PUB_SUB')
    private pubSub: PubSub,
  ) {}
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
  @Subscription(() => Message, {
    filter: (payload, variables) => {
      // console.log(payload, variables, payload.receiverId === variables.uid);
      return payload['receiverId'] === variables['uid'];
    },
    resolve: (stuff) => {
      return stuff;
    },
  })
  messageCreated(@Args('uid') uid: string) {
    // console.log('comes here why not');
    return this.pubSub.asyncIterator('messageCreated');
  }
}
