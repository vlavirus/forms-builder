import * as fieldReducer from './fields.reducer';

describe('FieldReducer', () => {
  it('should return the default state', () => {
    const { INIT_STATE } = fieldReducer;
    const action = {};
    // @ts-ignore
    const state = fieldReducer.reducer(undefined, action);

    expect(state).toBe(INIT_STATE);
  });
});
