import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SearchActions } from '../../../store/actions';
import { SearchSelectors } from '../../../store/selectors';
import { CoreState } from '../../../store/state';
import { debounceTime, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  searchTerm$ = this.store.pipe(select(SearchSelectors.getTerm));

  private readonly destroySubj$ = new Subject<void>();
  private readonly inputValueSubj$ = new Subject<string>();

  constructor(private readonly store: Store<CoreState.State>) {}

  ngOnInit(): void {
    this.inputValueSubj$
      .pipe(debounceTime(100), takeUntil(this.destroySubj$))
      .subscribe((term) => this.store.dispatch(SearchActions.setTerm({ term })));
  }

  ngOnDestroy(): void {
    this.destroySubj$.next();
  }

  setTerm(event: Event) {
    this.inputValueSubj$.next((event.target as HTMLInputElement).value);
  }
}
