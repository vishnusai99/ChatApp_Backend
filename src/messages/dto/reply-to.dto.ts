import { IsNotEmpty, IsOptional } from 'class-validator';

export class ReplyTo {
  @IsNotEmpty()
  messageId: string;
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  senderId: string;
}
