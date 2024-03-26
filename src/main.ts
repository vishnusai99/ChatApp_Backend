import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set the config options
  // const serviceAccount = require("../serviceAccountConfig.json");
  console.log('init');
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount)
  // });

  app.enableCors()
  await app.listen(3000);
}
bootstrap();
