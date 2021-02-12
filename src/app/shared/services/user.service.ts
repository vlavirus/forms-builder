import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable()
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
}
