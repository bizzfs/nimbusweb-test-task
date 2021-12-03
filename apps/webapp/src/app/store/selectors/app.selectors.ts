import { createSelector } from '@ngrx/store';
import { CoreState } from '../state';

export const getState = (state: CoreState.State) => state.app;
export const getSid = createSelector(getState, (state) => state.sid);
export const getIsLoading = createSelector(getState, (state) => state.isLoading);
export const getInitialized = createSelector(getState, (state) => state.initialized);
export const getError = createSelector(getState, (state) => state.error);
