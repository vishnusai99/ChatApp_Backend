import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field({ nullable: false })
  chatId: string;
  @Field({ nullable: false })
  senderId: string;
  @Field({ nullable: false })
  content: string;
  @Field({ nullable: false })
  timestamp: string;
  @Field({ nullable: false })
  type: string;
}
