import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirestoreModule } from '../firestore/firestore.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [FirestoreModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
