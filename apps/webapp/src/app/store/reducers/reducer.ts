import { ActionReducerMap } from '@ngrx/store';
import { CoreState } from '../state';
import { appReducer } from './app.reducer';
import { notesReducer } from './notes.reducer';
import { searchReducer } from '../selectors/search.reducer';
import { tagsReducer } from './tags.reducer';

export const reducer: ActionReducerMap<CoreState.State> = {
  app: appReducer,
  notes: notesReducer,
  search: searchReducer,
  tags: tagsReducer,
};
