import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  TOGGLE_SELECTED = '[Tags] Toggle Selected',
  CLEAR_SELECTED = '[Tags] Clear Selected',
}
export const toggleSelected = createAction(ActionTypes.TOGGLE_SELECTED, props<{ tag: string }>());
export const clearSelected = createAction(ActionTypes.CLEAR_SELECTED);
