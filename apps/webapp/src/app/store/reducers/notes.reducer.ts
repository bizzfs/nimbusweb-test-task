import { Action, createReducer, on } from '@ngrx/store';
import { NotesActions } from '../actions';
import { NotesState } from '../state';
import { StoredNote } from '@nimbusweb-test-task/ws-interfaces';
import { NoteState } from '../state/notes.state';
import { formatNoteTextTags } from '../../shared/helpers/format-note-text';

export const storedNoteMapper = (note: StoredNote): NoteState => {
  const tags = new Set<string>();
  let formattedText = note.text;

  if (note.text) {
    formattedText = formatNoteTextTags(note.text, (match) => tags.add(match));
  }

  return {
    ...note,
    lowerCasedTitle: note.title ? note.title.toLocaleLowerCase() : null,
    formattedText,
    tags: [...tags.values()],
  };
};

const reducer = createReducer(
  NotesState.initialState,
  on(NotesActions.addChange, NotesActions.addSuccess, (state, { note }) =>
    NotesState.adapter.addOne(storedNoteMapper(note), state)
  ),
  on(NotesActions.updateChange, (state, { note }) =>
    NotesState.adapter.updateOne({ id: note.id, changes: storedNoteMapper(note) }, state)
  ),
  on(NotesActions.deleteChange, (state, { id }) => NotesState.adapter.removeOne(id, state)),
  on(NotesActions.watchRequest, (state) => ({ ...state, initialized: false, error: null })),
  on(NotesActions.watchSuccess, (state) => ({ ...state, initialized: true })),
  on(NotesActions.failure, (state, { error }) => ({ ...state, error })),
  on(NotesActions.select, (state, { id }) => ({
    ...state,
    selectedId: state.entities[id] != null ? id : state.selectedId,
  }))
);

export function notesReducer(state: NotesState.State | undefined, action: Action) {
  return reducer(state, action);
}
