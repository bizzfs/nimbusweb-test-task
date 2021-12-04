import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreState } from '../../../store/state';
import { NotesActions } from '../../../store/actions';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {
  constructor(private readonly store: Store<CoreState.State>) {}

  ngOnInit(): void {
    this.store.dispatch(NotesActions.watchStart());
  }
}
