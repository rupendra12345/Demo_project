import { Action } from '@ngrx/store';
import { IUser } from './user';
export enum UserActionTypes {
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load Users Success',
  LoadUsersFailure = '[User] Load Users Failure',
  
}

export enum BusinessPartnerActionTypes{
  ADD_BP_CUSTOM_FIELDS_ACTION = "[BusinessPartner] addBpCustomFieldsAction",
  ADD_BP_CUSTOM_FIELDS_SUCCESS_ACTION = "[BusinessPartner] addBpCustomFieldsSuccessAction",
  ADD_BP_CUSTOM_FIELDS_FAILED_ACTION = "[BusinessPartner] addBpCustomFieldsFailedAction",

  FETCH_BP_CUSTOM_FIELDS_ACTION = "[BusinessPartner] fetchBpCustomFieldsAction",
  FETCH_BP_CUSTOM_FIELDS_SUCCESS_ACTION = "[BusinessPartner] fetchBpCustomFieldsSuccessAction",
  FETCH_BP_CUSTOM_FIELDS_FAILED_ACTION = "[BusinessPartner] fetchBpCustomFieldsFailedAction",

  ADD_BP_FAILED_ACTION = "[BusinessPartner] addBpFailedAction",


}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadUsersSuccess;
  constructor(public payload: { data: IUser[] }) { }
}

export class LoadUsersFailure implements Action {
  readonly type = UserActionTypes.LoadUsersFailure;
  constructor(public payload: { error: string }) { }
}
export class AddBpCustomFieldsAction implements Action {
  readonly type = BusinessPartnerActionTypes.ADD_BP_CUSTOM_FIELDS_ACTION;
  constructor(public payload: any) {}
}
export class AddBpCustomFieldsSuccessAction implements Action {
  readonly type =
    BusinessPartnerActionTypes.ADD_BP_CUSTOM_FIELDS_SUCCESS_ACTION;
  constructor(public payload: any) {}
}
export class AddBpCustomFieldsFailedAction implements Action {
  readonly type = BusinessPartnerActionTypes.ADD_BP_CUSTOM_FIELDS_FAILED_ACTION;
  constructor(public payload: any) {}
}

export class FetchBpCustomFieldsAction implements Action {
  readonly type = BusinessPartnerActionTypes.FETCH_BP_CUSTOM_FIELDS_ACTION;
  constructor(public payload: any) {}
}
export class FetchBpCustomFieldsSuccessAction implements Action {
  readonly type =
    BusinessPartnerActionTypes.FETCH_BP_CUSTOM_FIELDS_SUCCESS_ACTION;
  constructor(public payload: any) {}
}
export class FetchBpCustomFieldsFailedAction implements Action {
  readonly type =
    BusinessPartnerActionTypes.FETCH_BP_CUSTOM_FIELDS_FAILED_ACTION;
  constructor(public payload: any) {}
}
export class AddBusinessPartnerFailedAction implements Action {
  readonly type = BusinessPartnerActionTypes.ADD_BP_FAILED_ACTION;
  constructor(public payload: any) {}
}
export type UserActions = LoadUsers | LoadUsersSuccess | LoadUsersFailure;
export type BusinessPartnerAction =  AddBpCustomFieldsAction | AddBpCustomFieldsSuccessAction | AddBpCustomFieldsFailedAction | AddBusinessPartnerFailedAction | FetchBpCustomFieldsAction | FetchBpCustomFieldsSuccessAction | 
FetchBpCustomFieldsFailedAction

