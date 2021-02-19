import * as fromActions from './fields.action';
import * as fieldReducer from './fields.reducer';

describe('FieldReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { INIT_STATE } = fieldReducer;
      const action = {};
      // @ts-ignore
      const state = fieldReducer.reducer(undefined, action);

      expect(state).toBe(INIT_STATE);
    });
  });

  describe('ADD_FIELD action', () => {
    it('should add new field to currentFields', () => {
      const defaulElement = {
        id: '',
        style: [
          { name: 'placeholder', value: 'input', measurement: '' },
          { name: 'label', value: 'label', measurement: '' },
          { name: 'width', value: '330', measurement: 'px' },
          { name: 'height', value: '40', measurement: 'px' },
          { name: 'required', value: Array(2), measurement: '' },
          { name: 'border-style', value: Array(10), measurement: '' },
          { name: 'font-size', value: '16', measurement: 'px' },
          { name: 'color', value: '#1D9F90', measurement: '' },
        ],
        type: 'input'
      };
      const { INIT_STATE } = fieldReducer;
      const action = new fromActions.AddFieldAction({index: 0, item: defaulElement});
      const state = fieldReducer.reducer(undefined, action);

      expect(state.currentFields).toEqual([defaulElement]);
    });
  });
});
