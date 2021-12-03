import { Inject, Injectable } from '@nestjs/common';
import { JsonConvert } from 'json2typescript';
import { defer, finalize, Observable } from 'rxjs';
import { Changes, RCursor } from 'rethinkdb-ts/lib/types';

import {
  ChangeEvents,
  createAddChangeEvent,
  createDeleteChangeEvent,
  createUpdateChangeEvent,
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

  create(model: NoteModel): Promise<NoteModel> {
    return super.create(NoteModel.fromNote({ ...model, timestamp: Date.now() }));
  }

  update(model: NoteModel): Promise<NoteModel> {
    return super.update(NoteModel.fromNote({ ...model, timestamp: Date.now() }));
  }

  watchBySid(sid: string): Observable<ChangeEvents> {
    return defer(() => {
      let cursor: RCursor;

      return new Observable<ChangeEvents>((subscriber) => {
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
                  subscriber.next(createAddChangeEvent(newValue));
                  return;
                }
                if (oldValue != null && newValue != null) {
                  subscriber.next(createUpdateChangeEvent(oldValue, newValue));
                  return;
                }
                if (oldValue == null && newValue != null) {
                  subscriber.next(createDeleteChangeEvent(oldValue));
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
