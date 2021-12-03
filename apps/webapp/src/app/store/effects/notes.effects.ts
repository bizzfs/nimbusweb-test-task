import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';

import { EventTypes } from '@nimbusweb-test-task/ws-interfaces';

import { NoteActions } from '../actions';
import { NotesService } from '../../core/services/notes.service';

@Injectable()
export class NotesEffects {
  constructor(private readonly actions$: Actions, private readonly notesService: NotesService) {}

  initializeWsConnection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.watchRequest),
      switchMap(({ sid }) =>
        this.notesService.watch(sid).pipe(
          mergeMap((event, i) => {
            let action: Action;
            switch (event.event) {
              case EventTypes.ADD_CHANGE:
                action = NoteActions.addChange({ note: event.data.newValue });
                break;
              case EventTypes.UPDATE_CHANGE:
                action = NoteActions.updateChange({ note: { ...event.data.newValue, id: event.data.oldValue.id } });
                break;
              case EventTypes.DELETE_CHANGE:
                action = NoteActions.deleteChange({ id: event.data.oldValue.id });
                break;
              default:
                throw new Error('not supported event occurred');
            }
            return i === 0 ? [NoteActions.watchSuccess(), action] : [action];
          })
        )
      )
    )
  );

  addNote$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NoteActions.addRequest),
        tap(({ note }) => this.notesService.addNote(note))
      ),
    { dispatch: false }
  );

  updateNote = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NoteActions.updateRequest),
        tap(({ note }) => {
          this.notesService.updateNote(note);
        })
      ),
    { dispatch: false }
  );

  deleteNote$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NoteActions.deleteRequest),
        tap(({ id }) => {
          this.notesService.deleteNote(id);
        })
      ),
    { dispatch: false }
  );
}
