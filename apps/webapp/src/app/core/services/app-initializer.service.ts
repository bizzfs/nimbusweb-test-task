import { filter, merge, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppActions } from '../../store/actions';
import { AppSelectors } from '../../store/selectors';
import { CoreState } from '../../store/state';

export function initializeApp(appInitializerService: AppInitializerService) {
  return (): Promise<void> => appInitializerService.init();
}

@Injectable()
export class AppInitializerService {
  constructor(private readonly  store: Store<CoreState.State>) {}

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(AppActions.initializationStart());
      this.store.dispatch(AppActions.sidRequest());

      this.store.pipe(select(AppSelectors.getInitialized)).subscribe(console.log);

      const success$ = this.store.pipe(
        select(AppSelectors.getInitialized),
        filter((value) => value === true)
      );

      const failure$ = this.store.pipe(
        select(AppSelectors.getError),
        filter((err) => err != null),
        tap((err) => {
          throw err;
        })
      );

      merge(success$, failure$).subscribe({ next: () => resolve(), error: (err) => reject(err) });
    });
  }
}
