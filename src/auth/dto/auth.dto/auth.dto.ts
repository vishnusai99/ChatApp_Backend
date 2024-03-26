import { IsNotEmpty } from 'class-validator';
export class AuthDTO {
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  name: string;
}
