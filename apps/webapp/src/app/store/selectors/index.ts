import { NoteState } from '../state/notes.state';
import { createSelector } from '@ngrx/store';

export * as AppSelectors from './app.selectors';
import * as NotesSelectors from './notes.selectors';
import * as SearchSelectors from './search.selectors';
import * as TagsSelectors from './tags.selectors';
export { NotesSelectors, SearchSelectors, TagsSelectors };

export interface NotesAndTags {
  notes: NoteState[];
  tags: string[];
}

const createFilterFunc = (searchTerm: string, selectedTag: string | null) => {
  if (!searchTerm && !selectedTag) {
    return (note: NoteState) => true;
  }

  if (searchTerm) {
    searchTerm = searchTerm.toLocaleLowerCase();
    if (selectedTag) {
      return (note: NoteState) =>
        (note.tags.includes(selectedTag) && note.lowerCasedTitle?.includes(searchTerm)) || false;
    } else {
      return (note: NoteState) => note.lowerCasedTitle?.includes(searchTerm) || false;
    }
  }

  return (note: NoteState) => note.tags.includes(selectedTag || '');
};

export const getVisibleNotesAndTags = createSelector(
  NotesSelectors.selectAll,
  SearchSelectors.getTerm,
  TagsSelectors.getSelectedTag,
  (notes, searchTerm, selectedTag) => {
    const notesResult = notes.filter(createFilterFunc(searchTerm, selectedTag));
    notesResult.sort((prev, next) => next.timestamp - prev.timestamp);

    const tagsSet = new Set<string>();
    notesResult.forEach((note) => note.tags.forEach(tagsSet.add, tagsSet));

    return {
      notes: notesResult,
      tags: [...tagsSet.values()].sort((prev, next) => prev.localeCompare(next)),
    } as NotesAndTags;
  }
);

export const getVisibleNotes = createSelector(getVisibleNotesAndTags, (state) => state.notes);
export const getVisibleTags = createSelector(getVisibleNotesAndTags, (state) => state.tags);
