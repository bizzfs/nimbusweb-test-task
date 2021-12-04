import { Action, createReducer, on } from '@ngrx/store';
import { SearchActions } from '../actions';
import { SearchState } from '../state';

const reducer = createReducer(
  SearchState.initialState,
  on(SearchActions.setTerm, (state, { term }) => ({ term }))
);

export function searchReducer(state: SearchState.State | undefined, action: Action) {
  return reducer(state, action);
}
