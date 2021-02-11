import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as jwtEncode from 'jwt-encode';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromCore from 'app/core';
import { SetOnLoginAction } from 'app/core/core.actions';
import { environment } from 'environments/environment';
import { UserModel } from 'app/shared/models/user.model';

@Injectable()
export class AuthService {
  apiUrl = environment.apiUrl;

  public error$: Subject<string> = new Subject<string>();

  constructor(
    private store: Store<fromCore.State>,
    private http: HttpClient
  ) {}

  get token(): string {
    this.checkExpireDate();

    return localStorage.getItem('form-token');
  }

  checkExpireDate(): true | null {
    const expDate = new Date(localStorage.getItem('form-token-exp'));
    if (new Date() > expDate) {
      this.logOut();
      return null;
    }
    return true;
  }

  login(user: UserModel): Observable<any> | any {
    return this.http.get(`${this.apiUrl}users?login=${user.login}&password=${user.password}`)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
    );
  }

  logOut(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse): void {
    console.log(error);
    this.error$.next('Invalid email or password');
  }

  public setData(user: UserModel): void {
    this.store.dispatch(new SetOnLoginAction(user));
  }

  private setToken(response: any | null): any {
    if (response) {
      const expiresIn = 10000;
      const expData = new Date(new Date().getTime() + +expiresIn * 1000);
      const token =  jwtEncode(response, 'secret');
      localStorage.setItem('form-token', token);
      localStorage.setItem('form-token-exp', expData.toString());
    } else {
      localStorage.clear();
    }
  }
}
