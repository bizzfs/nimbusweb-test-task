import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CoreState } from '../../../store/state';
import { getVisibleNotes, NotesSelectors } from '../../../store/selectors';
import { NotesActions } from '../../../store/actions';
import { NoteState } from '../../../store/state/notes.state';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent {
  notes$ = this.store.pipe(select(getVisibleNotes));
  selectedNoteId$ = this.store.pipe(select(NotesSelectors.getSelectedId));

  constructor(private readonly store: Store<CoreState.State>) {}

  selectNote(id: string) {
    this.store.dispatch(NotesActions.select({ id }));
  }

  deleteNote(id: string) {
    this.store.dispatch(NotesActions.deleteRequest({ id }));
  }

  trackBy(index: number, note: NoteState): string {
    return note.id;
  }
}
