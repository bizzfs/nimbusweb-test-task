import { AppState, NotesState } from './';

export interface State {
  app: AppState.State;
  notes: NotesState.State;
}
