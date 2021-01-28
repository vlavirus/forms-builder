import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserModel } from './modules/user.model';
import { environment } from '../../environments/environment';
// import * as jwtDecode from 'jwt-decode';
import * as jwtEncode from 'jwt-encode';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  apiUrl = environment.apiUrl;

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('form-token-exp'));
    if (new Date() > expDate) {
      this.logOut();
      return null;
    }

    return localStorage.getItem('form-token');
  }

  login(user: UserModel): Observable<any> {
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

  private setToken(response: any | null): any {
    if (response) {
      const expiresIn = 6000;
      const expData = new Date(new Date().getTime() + +expiresIn * 1000);
      const token =  jwtEncode(response, 'secret');
      localStorage.setItem('form-token', token);
      localStorage.setItem('form-token-exp', expData.toString());
    } else {
      localStorage.clear();
    }
  }
}
