import { createAction, props } from '@ngrx/store';
import { Note, StoredNote } from '@nimbusweb-test-task/ws-interfaces';

export enum ActionTypes {
  ADD_CHANGE = '[Notes] Add Change',
  UPDATE_CHANGE = '[Notes] Update Change',
  DELETE_CHANGE = '[Notes] Delete Change',
  ADD_REQUEST = '[Notes] Add Request',
  UPDATE_REQUEST = '[Notes] Update Request',
  DELETE_REQUEST = '[Notes] Delete Request',
  WATCH_REQUEST = '[Notes] Watch Request',
  WATCH_SUCCESS = '[Notes] Watch Success',
}
export const addChange = createAction(ActionTypes.ADD_CHANGE, props<{ note: StoredNote }>());
export const updateChange = createAction(ActionTypes.UPDATE_CHANGE, props<{ note: StoredNote }>());
export const deleteChange = createAction(ActionTypes.DELETE_CHANGE, props<{ id: string }>());

export const addRequest = createAction(ActionTypes.ADD_REQUEST, props<{ note: Note }>());
export const updateRequest = createAction(ActionTypes.UPDATE_REQUEST, props<{ note: Note }>());
export const deleteRequest = createAction(ActionTypes.DELETE_REQUEST, props<{ id: string }>());

export const watchRequest = createAction(ActionTypes.WATCH_REQUEST, props<{ sid: string }>());
export const watchSuccess = createAction(ActionTypes.WATCH_SUCCESS);
