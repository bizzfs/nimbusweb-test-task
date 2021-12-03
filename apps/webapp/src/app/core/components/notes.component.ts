import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { interval, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { NoteActions } from '../../store/actions';
import { CoreState } from '../../store/state';

@Component({
  selector: 'app-notes',
  template: 'Hi its notes',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {
  constructor(private readonly store: Store<CoreState.State>) {}

  ngOnInit(): void {
    this.store.dispatch(NoteActions.watchRequest({ sid: 'xxx1' }));

    interval(1000)
      .pipe(tap(() => this.store.dispatch(NoteActions.addRequest({ note: { title: '1111', text: '1111' } }))))
      .subscribe();
  }
}
