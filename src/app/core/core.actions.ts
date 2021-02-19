import { Action } from '@ngrx/store';
import { UserModel } from 'app/shared/models/user.model';

export const ON_LOGIN = '[Core] On login';
export const ON_LOGIN_SUCCESS = '[Core] On login success';
export const ON_LOGIN_FAILURE = '[Core] On login failure';

export class SetOnLoginAction implements Action {
  readonly type = ON_LOGIN;
  constructor(public payload: UserModel) {}
}

export class SetOnLoginActionSuccess implements Action {
  readonly type = ON_LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class SetOnLoginActionFailure implements Action {
  readonly type = ON_LOGIN_FAILURE;
}

export type Actions =
  | SetOnLoginAction
  | SetOnLoginActionSuccess
  | SetOnLoginActionFailure;
