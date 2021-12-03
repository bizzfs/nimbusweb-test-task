import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(process.env.PORT || 3333);

  Logger.log('service started');
}

bootstrap();
