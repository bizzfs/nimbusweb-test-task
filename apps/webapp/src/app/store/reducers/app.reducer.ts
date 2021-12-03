import { Action, createReducer, on } from '@ngrx/store';
import { AppActions } from '../actions';
import { AppState } from '../state';

const reducer = createReducer(
  AppState.initialState,
  on(AppActions.sidRequest, (state) => ({ ...state, isLoading: true, error: null })),
  on(AppActions.sidSuccess, (state, { sid }) => ({
    ...state,
    sid,
    isLoading: false,
    initialized: true,
    error: null,
  })),
  on(AppActions.sidFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    initialized: false,
    error,
  }))
);

export function appReducer(state: AppState.State | undefined, action: Action) {
  return reducer(state, action);
}
