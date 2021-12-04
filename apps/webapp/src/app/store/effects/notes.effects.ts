import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, NEVER, switchMap, tap, withLatestFrom } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';

import { EventTypes } from '@nimbusweb-test-task/ws-interfaces';

import { AppSelectors } from '../selectors';
import { CoreState } from '../state';
import { NotesActions } from '../actions';
import { NotesService } from '../../core/services/notes.service';
import { map } from 'rxjs/operators';

@Injectable()
export class NotesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<CoreState.State>,
    private readonly notesService: NotesService
  ) {}

  watch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.watchStart),
      withLatestFrom(this.store.pipe(select(AppSelectors.getSid))),
      mergeMap(([, sid]) => (sid ? [NotesActions.watchRequest({ sid })] : NEVER))
    )
  );

  initializeWsConnection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.watchRequest),
      switchMap(({ sid }) =>
        this.notesService.watch(sid).pipe(
          mergeMap((event, i) => {
            let action: Action;
            switch (event.event) {
              case EventTypes.ADD_SUCCESS:
                action = NotesActions.addSuccess({ note: event.data });
                break;
              case EventTypes.ADD_CHANGE:
                action = NotesActions.addChange({ note: event.data.newValue });
                break;
              case EventTypes.UPDATE_SUCCESS:
                action = NotesActions.updateSuccess({ note: event.data });
                break;
              case EventTypes.UPDATE_CHANGE:
                action = NotesActions.updateChange({ note: { ...event.data.newValue } });
                break;
              case EventTypes.DELETE_SUCCESS:
                action = NotesActions.deleteSuccess({ id: event.data });
                break;
              case EventTypes.DELETE_CHANGE:
                action = NotesActions.deleteChange({ id: event.data.oldValue.id });
                break;
              case EventTypes.ADD_FAILURE:
              case EventTypes.DELETE_FAILURE:
              case EventTypes.UPDATE_FAILURE:
                action = NotesActions.failure({ error: new Error(event.data.msg) });
                break;
              default:
                throw new Error('not supported event occurred');
            }
            return i === 0 ? [NotesActions.watchSuccess(), action] : [action];
          })
        )
      )
    )
  );

  addNote$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NotesActions.addRequest),
        tap(({ note }) => this.notesService.addNote(note))
      ),
    { dispatch: false }
  );

  addNoteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.addSuccess),
      map(({ note: { id } }) => NotesActions.select({ id }))
    )
  );

  updateNote = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NotesActions.updateRequest),
        tap(({ note }) =>
          this.notesService.updateNote(note)
        )
      ),
    { dispatch: false }
  );

  deleteNote$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NotesActions.deleteRequest),
        tap(({ id }) => {
          this.notesService.deleteNote(id);
        })
      ),
    { dispatch: false }
  );
}
