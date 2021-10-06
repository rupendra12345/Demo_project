import { BusinessPartnerManagerState, initialBusinessPartnerState } from "./business-partner-state";
import { BusinessPartnerAction, BusinessPartnerActionTypes } from "./user.actions";

export function businessPartnerReducer(state: BusinessPartnerManagerState = initialBusinessPartnerState, action: BusinessPartnerAction): BusinessPartnerManagerState {
    switch (action.type) {
        case BusinessPartnerActionTypes.ADD_BP_CUSTOM_FIELDS_ACTION: {
            return {
              ...state,
              spinner: true,
              message: null,
              error: null
            };
          }
          case BusinessPartnerActionTypes.ADD_BP_CUSTOM_FIELDS_SUCCESS_ACTION: {
            return {
              ...state,
              spinner: false,
              message: null,
              customFields: [...state.customFields, action.payload],
              error: null
            };
          }
          case BusinessPartnerActionTypes.ADD_BP_CUSTOM_FIELDS_FAILED_ACTION: {
            return {
              ...state,
              spinner: false,
              message: null,
              error: action.payload
            };
          }
          case BusinessPartnerActionTypes.FETCH_BP_CUSTOM_FIELDS_ACTION: {
            return {
              ...state,
              message: null,
              error: null
            };
          }
      
          case BusinessPartnerActionTypes.FETCH_BP_CUSTOM_FIELDS_SUCCESS_ACTION: {
            return {
              ...state,
              message: null,
              error: null,
              customFields: action.payload
            };
          }
      
          case BusinessPartnerActionTypes.FETCH_BP_CUSTOM_FIELDS_FAILED_ACTION: {
            return {
              ...state,
              message: null,
              error: "Failed to get custom fields"
            };
          }
          default :
          return {
            ...state
          }
    }
}