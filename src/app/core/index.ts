import * as fromCore from './core.reducer';
import * as fromFields from './fields/fields.reducer';
import { createSelector } from '@ngrx/store';

export interface State {
  core: fromCore.State;
  fields: fromFields.State;
}

export const reducers = {
  core: fromCore.reducer,
  fields: fromFields.reducer
};


export const getFieldsState = (state: State) => state.fields;

export const getStaticFields = createSelector(
  getFieldsState,
  fromFields.getStaticFields
);
