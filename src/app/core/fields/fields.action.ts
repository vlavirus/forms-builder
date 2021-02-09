import { Action } from '@ngrx/store';

export const ADD_FIELD = '[Fields] on add';
export const REMOVE_FIELD = '[Fields] on remove';
export const GET_STATIC_FIELDS = '[Fields] get static fields';
export const GET_STATIC_FIELDS_SUCCESS = '[Fields] get static fields success';
export const ADD_FIELD_STYLE = '[Fields] on add style';
export const ADD_NEW_OPTION = '[Fields] on add new option';

export class AddFieldAction implements Action {
  readonly type = ADD_FIELD;
  constructor(public payload: { index, item }) {}
}

export class RemoveFieldAction implements Action {
  readonly type = REMOVE_FIELD;
  constructor(public payload: any) {}
}

export class GetStaticFieldsActions implements Action {
  readonly type = GET_STATIC_FIELDS;
}

export class GetStaticFieldsSuccess implements Action {
  readonly type = GET_STATIC_FIELDS_SUCCESS;
  constructor(public payload: any) {}
}

export class AddStyleToField implements Action {
  readonly type = ADD_FIELD_STYLE;
  constructor(public payload: {id, styles}) {}
}

export class AddNewOption implements Action {
  readonly type = ADD_NEW_OPTION;
  constructor(public payload: {id, option}) {}
}

export type Actions =
  | AddFieldAction
  | RemoveFieldAction
  | GetStaticFieldsActions
  | GetStaticFieldsSuccess
  | AddStyleToField
  | AddNewOption;
