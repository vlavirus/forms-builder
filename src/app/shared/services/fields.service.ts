import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as fromFields from '../../core/index';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { FormElementModel } from '../models/form-element.model';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

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
}
