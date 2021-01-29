import { UserModel } from '../shared/modules/user.model';
import * as coreActions from './core.actions';

export interface State {
  isAuthenticated: boolean;
  userInfor: UserModel;
}

export const INIT_STATE: State = {
  isAuthenticated: null,
  userInfor: null
};

export function reducer(state: State = INIT_STATE, action: coreActions.Actions) {
  switch (action.type) {

    case coreActions.ON_LOGIN:
      return { isAuthenticated: true, userInfor: action.payload };
    default:
      return state;
  }
}
