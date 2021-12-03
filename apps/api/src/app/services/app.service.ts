import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ChangeEvents } from '@nimbusweb-test-task/ws-interfaces';

import { NoteModel } from '../models/note.model';
import { NotesService } from './notes.service';
import { SessionsService } from './sessions.service';
import { SessionModel } from '../models/session.model';

@Injectable()
export class AppService {
  constructor(private readonly notesService: NotesService, private readonly sessionsService: SessionsService) {}

  watchNotesBySid(sid: string): Observable<ChangeEvents> {
    return this.notesService.watchBySid(sid);
  }

  addNote(note: NoteModel): Promise<NoteModel> {
    return this.notesService.create(note);
  }

  updateNote(note: NoteModel): Promise<NoteModel> {
    return this.notesService.update(note);
  }

  deleteNoteById(id: string) {
    return this.notesService.deleteById(id);
  }

  createSession(): Promise<SessionModel> {
    return this.sessionsService.create(SessionModel.fromTimestamp(Date.now()));
  }
}
