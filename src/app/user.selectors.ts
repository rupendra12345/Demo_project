import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BusinessPartnerManagerState } from './business-partner-state';
import { AppState } from './interface';
import { UserState } from './user.reducer'

const getUserFeatureState = createFeatureSelector<AppState,UserState>('usersState');
const selectBussinessPartnerState = createFeatureSelector<
AppState,
BusinessPartnerManagerState
>("businessPartner");
export const getUsers = createSelector(
    getUserFeatureState,
    state => state.users
)

export const getError = createSelector(
    getUserFeatureState,
    state => state.error
)

export const bpSpinnerSelector = createSelector(
    selectBussinessPartnerState,
    (state: BusinessPartnerManagerState) => state.spinner
  );
  
  export const bpErrorSelector = createSelector(
    selectBussinessPartnerState,
    (state: BusinessPartnerManagerState) => state.error
  );
  
  export const bpMessageSelector = createSelector(
    selectBussinessPartnerState,
    (state: BusinessPartnerManagerState) => state.message
  );
  
  export const bpCustomFieldSelector = createSelector(
    selectBussinessPartnerState,
    (state: BusinessPartnerManagerState) => state.customFields
  );