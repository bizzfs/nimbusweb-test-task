import { Inject, Injectable } from '@nestjs/common';
import { JsonConvert } from 'json2typescript';
import { Connection } from 'rethinkdb-ts';

import { RepositoryService } from './repository.service';
import { SessionModel } from '../models/session.model';
import { RETHINKDB_PROVIDER } from '../providers/rethinkdb.provider';

@Injectable()
export class SessionsService extends RepositoryService<SessionModel> {
  constructor(jsonConvert: JsonConvert, @Inject(RETHINKDB_PROVIDER) connection: Connection) {
    super(jsonConvert, connection, SessionModel);
  }
}
