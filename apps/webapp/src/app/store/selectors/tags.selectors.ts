import { createSelector } from '@ngrx/store';
import { CoreState } from '../state';

export const getState = (state: CoreState.State) => state.tags;
export const getSelectedTag = createSelector(getState, (state) => state.selectedTag);
