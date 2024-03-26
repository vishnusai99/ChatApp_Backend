import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { FirestoreService } from './firestore/firestore.service';
import { FirestoreModule } from './firestore/firestore.module';
import { ChatsService } from './chats/chats.service';
import { ChatsController } from './chats/chats.controller';
import { MessagesService } from './messages/messages.service';
import { MessagesController } from './messages/messages.controller';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { ImageModule } from './image/image.module';
import { MessagesResolver } from './messages/messages.resolver';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': { keepAlive: 10 },
      },
    }),
    ProfileModule,
    FirestoreModule,
    AuthModule,
    ChatsModule,
    MessagesModule,
    ImageModule,
  ],
  controllers: [
    AppController,
    ChatsController,
    MessagesController,
    ImageController,
  ],
  providers: [
    AppService,
    FirestoreService,
    ChatsService,
    MessagesService,
    ImageService,
    MessagesResolver,
  ],
})
export class AppModule {}
