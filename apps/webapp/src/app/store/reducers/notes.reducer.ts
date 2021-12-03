import { Action, createReducer, on } from '@ngrx/store';
import { NoteActions } from '../actions';
import { NotesState } from '../state';

const reducer = createReducer(
  NotesState.initialState,
  on(NoteActions.addChange, (state, { note }) => NotesState.adapter.addOne(note, state)),
  on(NoteActions.updateChange, (state, { note }) =>
    NotesState.adapter.updateOne({ id: note.id, changes: note }, state)
  ),
  on(NoteActions.deleteChange, (state, { id }) => NotesState.adapter.removeOne(id, state)),
  on(NoteActions.watchRequest, (state) => ({ ...state, initialized: false, error: null })),
  on(NoteActions.watchSuccess, (state) => ({ ...state, initialized: true }))
);

export function notesReducer(state: NotesState.State | undefined, action: Action) {
  return reducer(state, action);
}
