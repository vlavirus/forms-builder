import { UserModel } from '../shared/models/user.model';
import * as coreActions from './core.actions';

export interface State {
  isAuthenticated: boolean;
  userInfo: UserModel;
}

export const INIT_STATE: State = {
  isAuthenticated: null,
  userInfo: null
};

export function reducer(state: State = INIT_STATE, action: coreActions.Actions) {
  switch (action.type) {
    case coreActions.ON_LOGIN:
      return { isAuthenticated: true, userInfo: action.payload };
    default:
      return state;
  }
}
