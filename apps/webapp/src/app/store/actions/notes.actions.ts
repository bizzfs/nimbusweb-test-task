import { createAction, props } from '@ngrx/store';
import { Note, StoredNote, UpdateNotePayload } from '@nimbusweb-test-task/ws-interfaces';

export enum ActionTypes {
  ADD_CHANGE = '[Notes] Add Change',
  UPDATE_CHANGE = '[Notes] Update Change',
  DELETE_CHANGE = '[Notes] Delete Change',
  ADD_REQUEST = '[Notes] Add Request',
  ADD_SUCCESS = '[Notes] Add Success', // Doesn't change state, used in side effects
  UPDATE_REQUEST = '[Notes] Update Request',
  UPDATE_SUCCESS = '[Notes] Update Success', // Doesn't change state, used in side effects
  DELETE_REQUEST = '[Notes] Delete Request',
  DELETE_SUCCESS = '[Notes] Delete Success', // Doesn't change state, used in side effects
  FAILURE = '[Notes] Failure',
  WATCH_START = '[Notes] Watch Start',
  WATCH_STOP = '[Notes] Watch Stop',
  WATCH_REQUEST = '[Notes] Watch Request',
  WATCH_SUCCESS = '[Notes] Watch Success',
  SELECT = '[Notes] Select',
}
export const addChange = createAction(ActionTypes.ADD_CHANGE, props<{ note: StoredNote }>());
export const updateChange = createAction(ActionTypes.UPDATE_CHANGE, props<{ note: StoredNote }>());
export const deleteChange = createAction(ActionTypes.DELETE_CHANGE, props<{ id: string}>());

export const addRequest = createAction(ActionTypes.ADD_REQUEST, props<{ note: Note }>());
export const addSuccess = createAction(ActionTypes.ADD_SUCCESS, props<{ note: StoredNote }>());
export const updateRequest = createAction(ActionTypes.UPDATE_REQUEST, props<{ note: UpdateNotePayload }>());
export const updateSuccess = createAction(ActionTypes.UPDATE_SUCCESS, props<{ note: StoredNote }>());
export const deleteRequest = createAction(ActionTypes.DELETE_REQUEST, props<{ id: string }>());
export const deleteSuccess = createAction(ActionTypes.DELETE_SUCCESS, props<{ id: string }>());
export const failure = createAction(ActionTypes.FAILURE, props<{ error: Error }>());

export const watchStart = createAction(ActionTypes.WATCH_START);
export const watchStop = createAction(ActionTypes.WATCH_STOP);
export const watchRequest = createAction(ActionTypes.WATCH_REQUEST, props<{ sid: string }>());
export const watchSuccess = createAction(ActionTypes.WATCH_SUCCESS);

export const select = createAction(ActionTypes.SELECT, props<{ id: string }>());
