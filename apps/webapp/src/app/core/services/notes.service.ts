import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import {
  createAddRequestEvent,
  createDeleteRequestEvent,
  createUpdateRequestEvent,
  Events,
  Note,
  UpdateNotePayload,
} from '@nimbusweb-test-task/ws-interfaces';

import { ENV } from '../../env.provider';
import { Env } from '../../types';

@Injectable()
export class NotesService {
  private wsSubj$: WebSocketSubject<Events> | null = null;

  constructor(@Inject(ENV) private readonly env: Env) {}

  watch(sid: string): Observable<Events> {
    if (this.wsSubj$ && !this.wsSubj$.closed) {
      this.wsSubj$.complete();
    }
    this.wsSubj$ = webSocket<Events>(`${this.env.wsUrl}?sid=${sid}`);
    return this.wsSubj$.asObservable();
  }

  addNote(note: Note): void {
    this.wsSubj$?.next(createAddRequestEvent(note));
  }

  updateNote(note: UpdateNotePayload): void {
    this.wsSubj$?.next(createUpdateRequestEvent(note));
  }

  deleteNote(id: string): void {
    this.wsSubj$?.next(createDeleteRequestEvent(id));
  }

  close() {
    this.wsSubj$?.complete();
  }
}
