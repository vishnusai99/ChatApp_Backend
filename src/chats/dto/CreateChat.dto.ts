import { IsNotEmpty } from 'class-validator';

export class CreateChat {
  @IsNotEmpty()
  participant1UID: string;
  @IsNotEmpty()
  participant2UID: string;
}
