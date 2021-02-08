import * as fieldsAction from './fields.action';
import { FormElementModel } from 'app/shared/models/form-element.model';

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
      return { ...state, currentFields: [
        ...state.currentFields.slice(0, action.payload.index),
        action.payload.item,
        ...state.currentFields.slice(action.payload.index)]
      };
    case fieldsAction.REMOVE_FIELD:
      return { ...state, currentFields: [ ...state.currentFields.filter(currentItem => currentItem.id !== action.payload['id']) ] };
    case fieldsAction.GET_STATIC_FIELDS_SUCCESS:
      return { ...state, staticFields: [ ...action.payload ] };
    case fieldsAction.ADD_FIELD_STYLE:
      const currentItem = state.currentFields.find(item => item.id  === action.payload.id);
      const currentItemIndex = state.currentFields.findIndex(item => item.id  === action.payload.id);
      const newStyle = currentItem.style.map(({name, measurement}) => {
          return { name, value: action.payload.styles[name], measurement };
      });

      return { ...state, currentFields: [
          ...state.currentFields.slice(0, currentItemIndex),
          {id: currentItem.id, style: newStyle, type: currentItem.type },
          ...state.currentFields.slice(currentItemIndex + 1)]
      };
    default:
      return state;
  }
}

export const getStaticFields = (state: State): FormElementModel[] => state.staticFields;
export const getCurrentFields = (state: State): FormElementModel[] => state.currentFields;
