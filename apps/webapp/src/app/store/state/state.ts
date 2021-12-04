import { AppState, NotesState, SearchState, TagsState } from './';

export interface State {
  app: AppState.State;
  notes: NotesState.State;
  search: SearchState.State;
  tags: TagsState.State;
}
