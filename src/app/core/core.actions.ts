import { Action } from '@ngrx/store';
import { UserModel } from 'app/shared/models/user.model';

export const ON_LOGIN = '[Core] On login';

export class SetOnLoginAction implements Action {
  readonly type = ON_LOGIN;
  constructor(public payload: UserModel) {}
}

export type Actions = | SetOnLoginAction;
