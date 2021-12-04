import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AppSelectors } from '../../store/selectors';
import { CoreState } from '../../store/state';

@Injectable()
export class InitialNavigationGuardService implements CanActivate {
  constructor(private router: Router, private store: Store<CoreState.State>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route.queryParamMap.get('sid')) {
      return true;
    }

    return this.store.pipe(
      select(AppSelectors.getSid),
      first(),
      map((sid) => {
        if (sid) {
          return this.router.createUrlTree([], { queryParams: { sid } });
        }
        return true;
      })
    );
  }
}
