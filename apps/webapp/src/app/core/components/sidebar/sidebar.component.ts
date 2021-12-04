import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CoreState } from '../../../store/state';
import { Store } from '@ngrx/store';
import { NotesActions } from '../../../store/actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  constructor(private readonly store: Store<CoreState.State>) {}

  addNote() {
    this.store.dispatch(NotesActions.addRequest({ note: { title: 'New Note', text: '' } }));
  }
}
