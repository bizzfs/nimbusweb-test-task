import { Inject, Injectable } from '@nestjs/common';
import { JsonConvert } from 'json2typescript';
import { Changes, RCursor } from 'rethinkdb-ts/lib/types';
import { defer, finalize, Observable } from 'rxjs';

import {
  ChangeEvents,
  createChangeAddEvent,
  createChangeDeleteEvent,
  createChangeUpdateEvent,
} from '@nimbusweb-test-task/ws-interfaces';

import { Connection, r } from 'rethinkdb-ts';
import { NoteModel } from '../models/note.model';
import { RepositoryService } from './repository.service';
import { RETHINKDB_PROVIDER } from '../providers/rethinkdb.provider';

@Injectable()
export class NotesService extends RepositoryService<NoteModel> {
  constructor(jsonConvert: JsonConvert, @Inject(RETHINKDB_PROVIDER) connection: Connection) {
    super(jsonConvert, connection, NoteModel);
  }

  watchBySid(sid: string): Observable<ChangeEvents<NoteModel>> {
    return defer(() => {
      let cursor: RCursor;

      return new Observable<ChangeEvents<NoteModel>>((subscriber) => {
        r.table(this.table)
          .filter(r.row('sid').eq(sid))
          .changes({ squash: true, includeInitial: true, includeStates: true })
          .run(this.connection)
          .then((cur: RCursor) => {
            cursor = cur;
            cur.eachAsync(
              (res: Changes) => {
                const oldValue = res.old_val && this.jsonConvert.deserializeObject(res.old_val, NoteModel);
                const newValue = res.new_val && this.jsonConvert.deserializeObject(res.new_val, NoteModel);
                if (oldValue == null && newValue != null) {
                  subscriber.next(createChangeAddEvent(newValue));
                  return;
                }
                if (oldValue != null && newValue != null) {
                  subscriber.next(createChangeUpdateEvent(oldValue, newValue));
                  return;
                }
                if (oldValue == null && newValue != null) {
                  subscriber.next(createChangeDeleteEvent(oldValue));
                  return;
                }
              },
              (err) => (err ? subscriber.error(err) : subscriber.complete())
            );
          });
      }).pipe(finalize(() => cursor.close()));
    });
  }
}
