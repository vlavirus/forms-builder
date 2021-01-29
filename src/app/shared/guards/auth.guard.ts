import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Store } from '@ngrx/store';

import * as fromCore from 'app/core/';
import { AuthService } from '../auth.service';
import { SetOnLoginAction } from '../../core/core.actions';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromCore.State>,
    private router: Router,
    private auth: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isAuthenticated() && this.auth.checkExpireDate()) {
      const token = this.auth.token;
      const userInfo = jwt_decode(token)[0];
      delete userInfo.id;
      this.store.dispatch(new SetOnLoginAction(userInfo));
      return true;
    } else {
      this.auth.logOut();
      this.router.navigate([''], {
        queryParams: {
          loginAgain: true
        }
      });
    }
  }
}
