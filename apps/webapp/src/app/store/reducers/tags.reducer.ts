import { Action, createReducer, on } from '@ngrx/store';
import { TagsActions } from '../actions';
import { TagsState } from '../state';

const reducer = createReducer(
  TagsState.initialState,
  on(TagsActions.toggleSelected, (state, { tag }) => ({
    ...state,
    selectedTag: state.selectedTag !== tag ? tag : null,
  })),
  on(TagsActions.clearSelected, (state) => ({
    ...state,
    selectedTag: null,
  }))
);

export function tagsReducer(state: TagsState.State | undefined, action: Action) {
  return reducer(state, action);
}
