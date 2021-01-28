import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

@Injectable()
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public isValidSession() {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      // return this.http.post(`${this.apiUrl}${ApiConstants.accounts.verifyToken}`, { token });
    }
    return of(false);
  }
}
