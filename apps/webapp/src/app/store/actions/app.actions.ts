import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  INITIALIZATION_START = '[App] Initialization Start',
  INITIALIZATION_SUCCESS = '[App] Initialization Success',
  INITIALIZATION_FAILURE = '[App] Initialization Failure',
  SID_REQUEST = '[App] Sid Request',
  SID_SUCCESS = '[App] Sid Success',
  SID_FAILURE = '[App] Sid Failure',
}
export const initializationStart = createAction(ActionTypes.INITIALIZATION_START);
export const initializationSuccess = createAction(ActionTypes.INITIALIZATION_SUCCESS);
export const initializationFailure = createAction(ActionTypes.INITIALIZATION_FAILURE);
export const sidRequest = createAction(ActionTypes.SID_REQUEST);
export const sidSuccess = createAction(ActionTypes.SID_SUCCESS, props<{ sid: string }>());
export const sidFailure = createAction(ActionTypes.SID_FAILURE, props<{ error: Error }>());
