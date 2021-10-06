import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as userActions from './user.actions';
import { UserService } from './user.service';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { AddBpCustomFieldsSuccessAction, AddBusinessPartnerFailedAction, BusinessPartnerAction, BusinessPartnerActionTypes, FetchBpCustomFieldsFailedAction, FetchBpCustomFieldsSuccessAction } from './user.actions';
import { BusinessPartnerService } from './servive/business-partner.service';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userService: UserService,private businessPartnerService: BusinessPartnerService) { }

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LoadUsers),
    mergeMap(
      action => this.userService.getUsers().pipe(
        map(users => (new userActions.LoadUsersSuccess({ data: users }))),
        catchError(err => of(new userActions.LoadUsersFailure({ error: err })))
      )
    )
  )

  @Effect()
  customField$: Observable<Action> = this.actions$.pipe(
    ofType(BusinessPartnerActionTypes.ADD_BP_CUSTOM_FIELDS_ACTION),
    switchMap((action: BusinessPartnerAction) => this.businessPartnerService.addCustomField(action.payload)),
    map((res: any) =>
      res!.status == 200
        ? new AddBpCustomFieldsSuccessAction(res.data)
        : new AddBusinessPartnerFailedAction(res.error ? String(res.error) : "Enable to create custom field rigth now")
    ),
    catchError(error => of(new AddBusinessPartnerFailedAction("Unexpected error occurred")))
  );

  @Effect()
  fetchCustomFields$: Observable<Action> = this.actions$.pipe(
    ofType(BusinessPartnerActionTypes.FETCH_BP_CUSTOM_FIELDS_ACTION),
    switchMap((action: BusinessPartnerAction) => this.businessPartnerService.getCustomFields()),
    map((res: any) => (res.status === 200 ? new FetchBpCustomFieldsSuccessAction(res.data) : new FetchBpCustomFieldsFailedAction(String(res.error)))),
    catchError(err => of(new FetchBpCustomFieldsFailedAction("Unexpected error occurred")))
  );
}

