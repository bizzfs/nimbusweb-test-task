import { Inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { exhaustMap, map, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, EffectNotification, ofType, OnRunEffects } from '@ngrx/effects';

import { AppActions } from '../actions';
import { CoreState } from '../state';
import { Env } from '../../types';
import { ENV } from '../../env.provider';
import { SessionsService } from '../../core/services/sessions.service';
import { WINDOW } from '../../window.providers';

@Injectable()
export class AppEffects implements OnRunEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly sessionsService: SessionsService,
    private readonly store: Store<CoreState.State>,
    @Inject(ENV) private readonly env: Env,
    @Inject(WINDOW) private readonly window: Window
  ) {}

  initializeSid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.sidRequest),
      exhaustMap(() => {
        const sid = new URLSearchParams(this.window.location.search).get('sid');
        if (sid) {
          return [AppActions.sidSuccess({ sid })];
        }

        return this.sessionsService.createSid().pipe(
          map((sid) => AppActions.sidSuccess({ sid })),
          catchError((err) => [AppActions.sidFailure({ error: err })])
        );
      })
    )
  );

  ngrxOnRunEffects = (resolvedEffects$: Observable<EffectNotification>) =>
    this.actions$.pipe(
      ofType(AppActions.initializationStart),
      exhaustMap(() =>
        resolvedEffects$.pipe(
          takeUntil(this.actions$.pipe(ofType(AppActions.initializationSuccess, AppActions.initializationFailure)))
        )
      )
    );
}
