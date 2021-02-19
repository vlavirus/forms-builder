import * as coreReducer from './core.reducer';
import * as fromActions from './core.actions';

describe('CoreReducer', () => {
  describe('undefined action', () => {
    it('should return default state', () => {
      const { INIT_STATE } = coreReducer;
      const action = {};
      // @ts-ignore
      const state = coreReducer.reducer(undefined, action);

      expect(state).toBe(INIT_STATE);
    });
  });

  describe('ON_LOGIN_FAILURE action', () => {
    it('should return isAuthenticated false', () => {
      const { INIT_STATE } = coreReducer;
      const action = new fromActions.SetOnLoginActionFailure();
      const state = coreReducer.reducer(INIT_STATE, action);

      expect(state.isAuthenticated).toBeFalse();
    });
  });

  describe('ON_LOGIN_SUCCESS action', () => {
    it('should return isAuthenticated true, and userInfo in state', () => {
      const userInfo = {
        id: 1,
        login: 'test@gmail.com',
        password: '123'
      };
      const { INIT_STATE } = coreReducer;
      const action = new fromActions.SetOnLoginActionSuccess(userInfo);
      const state = coreReducer.reducer(INIT_STATE, action);

      expect(state.isAuthenticated).toBeTruthy();
      expect(state.userInfo).toEqual(userInfo);
    });
  });
});
