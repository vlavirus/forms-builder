import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import * as fromFields from 'app/core/index';


@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  apiUrl = environment.apiUrl;

  constructor(
    private fieldsStore: Store<fromFields.State>,
    private http: HttpClient
  ) {}

  getStaticData(): Observable<any> | any{
    return this.http.get(`${this.apiUrl}draggable-fields`);
  }

  getGeneralStyle(): Observable<any> | any{
    return this.http.get(`${this.apiUrl}general-style`);
  }
}
