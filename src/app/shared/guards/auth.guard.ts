import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import * as fromCore from 'app/core/';
import { AuthService } from '../services/auth.service';
import { SetOnLoginAction } from 'app/core/core.actions';
import { catchError, first, map, shareReplay, switchMap, tap } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromCore.State>,
    private router: Router,
    private auth: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.auth.isAuthenticated().pipe(
      first(),
      shareReplay(1),
      switchMap(() =>
        this.auth.getInforFormToken().pipe(
          tap(res => this.store.dispatch(new SetOnLoginAction(res))),
          map(_ => true))
      ),
      catchError(res => {
        this.auth.logOut();
        this.router.navigate([''], { queryParams: { loginAgain: true } });
        return of(false);
      })
    );
  }
}
