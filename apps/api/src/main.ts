import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(process.env.PORT || 3333);

  Logger.log('service started');
}

bootstrap();
