import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  SET_TERM = '[Search] Set Term',
}
export const setTerm = createAction(ActionTypes.SET_TERM, props<{ term: string }>());

