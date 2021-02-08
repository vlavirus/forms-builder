import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import * as fromFields from '../../core/index';
import { first } from 'rxjs/operators';

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
    return this.http.get(`${this.apiUrl}draggable-fields`).pipe(
      first()
    ).toPromise();
  }
}
