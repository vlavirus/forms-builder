import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { exhaustMap, first, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fieldsActions from './fields.action';
import { FieldsService } from 'app/shared/services/fields.service';

@Injectable()
export class FieldsEffect {

  constructor(
    private actions$: Actions,
    private fieldsService: FieldsService,
  ) {}

  getStaticFields$ = createEffect((): Observable<any> => {
    return  this.actions$.pipe(
      ofType(fieldsActions.GET_STATIC_FIELDS),
      exhaustMap(() => this.fieldsService.getStaticData()
        .then(res => {
          return new fieldsActions.GetStaticFieldsSuccess(res);
        })
      )
    );
  });

}
