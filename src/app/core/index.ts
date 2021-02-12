import { createSelector } from '@ngrx/store';

import * as fromCore from './core.reducer';
import * as fromFields from './fields/fields.reducer';

export interface State {
  core: fromCore.State;
  fields: fromFields.State;
}

export const reducers = {
  core: fromCore.reducer,
  fields: fromFields.reducer
};

export const getFieldsState = (state: State) => state.fields;
export const getCoreState = (state: State) => state.core;

export const getStaticFields = createSelector(
  getFieldsState,
  fromFields.getStaticFields
);

export const getCurrentFields = createSelector(
  getFieldsState,
  fromFields.getCurrentFields
);

export const getGeneralStyle = createSelector(
  getFieldsState,
  fromFields.getGeneralStyle
);

export const getAuthenticated = createSelector(
  getCoreState,
  fromCore.getAuthenticated
);
