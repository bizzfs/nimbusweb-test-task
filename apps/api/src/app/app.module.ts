import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './services/app.service';
import { configurationFactory } from './configuration';
import { jsonConvertProvider } from './providers/json-convert.provider';
import { NotesService } from './services/notes.service';
import { rethinkdbProvider } from './providers/rethinkdb.provider';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './services/sessions.service';
import { WsGateway } from './ws.gateway';

@Module({
  imports: [ConfigModule.forRoot({ load: [configurationFactory], isGlobal: true })],
  controllers: [SessionsController],
  providers: [AppService, WsGateway, SessionsService, NotesService, rethinkdbProvider, jsonConvertProvider],
})
export class AppModule {}
