import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  getStaticData(): Observable<{}> {
    return this.http.get(`${this.apiUrl}draggable-fields`);
  }

  getGeneralStyle(): Observable<any> {
    return this.http.get(`${this.apiUrl}general-style`);
  }
}
