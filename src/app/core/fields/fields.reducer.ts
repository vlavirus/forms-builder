import { FormElementModel } from '../../shared/models/form-element.model';
import * as fieldsAction from './fields.action';
import { FieldsModule } from './fields.module';

export interface State {
  currentFields: FormElementModel[];
  staticFields: FormElementModel[];
}

export const INIT_STATE: State = {
  currentFields: [],
  staticFields: []
};

export function reducer(state: State = INIT_STATE, action: fieldsAction.Actions) {
  switch (action.type) {
    case fieldsAction.ADD_FIELD:
      console.log('ADD_FIELD', action.payload);
      debugger
      return { ...state, currentFields: [ ...state.currentFields, action.payload ] };
    case fieldsAction.REMOVE_FIELD:
      return { ...state, currentFields: [ ...state.currentFields.filter(currentItem => currentItem.id !== action.payload['id']) ] };
    case fieldsAction.GET_STATIC_FIELDS_SUCCESS:
      console.log(action.payload);
      return { staticFields: [ ...action.payload ] };
    default:
      return state;
  }
}

export const getStaticFields = (state: State): FormElementModel[] => state.staticFields;
