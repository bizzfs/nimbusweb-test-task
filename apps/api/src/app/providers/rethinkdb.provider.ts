import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { r, Connection } from 'rethinkdb-ts';
import { Env } from '../configuration';

export const RETHINKDB_PROVIDER = 'RethinkdbProvider';

export const rethinkdbProvider: FactoryProvider<Promise<Connection>> = {
  provide: RETHINKDB_PROVIDER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService<Env>) =>
    r.connect({
      host: configService.get('dbHost'),
      port: configService.get('dbPort'),
      db: configService.get('dbName'),
    }),
};
