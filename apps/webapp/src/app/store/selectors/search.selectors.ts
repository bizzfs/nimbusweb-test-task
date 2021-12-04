import { createSelector } from '@ngrx/store';
import { CoreState } from '../state';

export const getState = (state: CoreState.State) => state.search;
export const getTerm = createSelector(getState, (state) => state.term);
