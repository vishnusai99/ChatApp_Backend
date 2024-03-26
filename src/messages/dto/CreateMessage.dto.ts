import { IsNotEmpty, IsOptional } from 'class-validator';
import { ReplyTo } from './reply-to.dto';

export class CreateMessage {
  @IsNotEmpty()
  conversationId: string;
  @IsNotEmpty()
  senderId: string;
  @IsNotEmpty()
  receiverId: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  timestamp: string;
  @IsNotEmpty()
  type: string;
  @IsOptional()
  replyTo: ReplyTo;
}
