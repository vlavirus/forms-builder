import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { first, map, switchMap } from 'rxjs/operators';
import { FieldsService } from '../../shared/services/fields.service';

import * as fieldsActions from './fields.action';
import { Observable } from 'rxjs';

@Injectable()
export class FieldsEffect {
  constructor(
    private actions$: Actions,
    private fieldsService: FieldsService,

  ) {
  }

  getStaticFields$ = createEffect((): Observable<any> => {
    return this.actions$.pipe(
      ofType(fieldsActions.GET_STATIC_FIELDS),
      switchMap(() => this.fieldsService.getStaticData().pipe(
        first(),
        map((value: any) => {
          debugger
          return new fieldsActions.GetStaticFieldsSuccess(value);
        })
      ))
    );
  });

}
