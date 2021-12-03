import { createSelector } from '@ngrx/store';
import { CoreState, NotesState } from '../state';

export const getState = (state: CoreState.State) => state.notes;
export const getInitialized = createSelector(getState, (state) => state.initialized);
export const getError = createSelector(getState, (state) => state.error);
export const { selectAll, selectEntities, selectIds, selectTotal } = NotesState.adapter.getSelectors(getState);
