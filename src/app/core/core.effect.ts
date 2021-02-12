import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';

import * as coreActions from './core.actions';
import { AuthService } from 'app/shared/services/auth.service';

@Injectable()
export class CoreEffect {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  loginUser$ = createEffect((): Observable<any> => {
    return this.actions$.pipe(
      ofType(coreActions.ON_LOGIN),
      switchMap(({payload}) => {
        return this.authService.login(payload).pipe(
          filter(res => !!res),
          first(),
          map((res) => res[0] ? new coreActions.SetOnLoginActionSuccess(res[0]) :
            new coreActions.SetOnLoginActionFailure(res[0])
          ));
      })
    );
  });

}
