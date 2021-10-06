import { AppState as State } from "./interface";
import * as fromBp from "./business-partner.reducer";
import * as fromUser from "./user.reducer";

import { ActionReducer, ActionReducerMap } from "@ngrx/store";
import { MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";
export const reducer: ActionReducerMap<State> = {
    businessPartner: fromBp.businessPartnerReducer,
    usersState:fromUser.reducer
}

/**
 * logger reducer
 * @param reducer ofType ActionReducer<>
 */
 export function logger(reducer: ActionReducer<State>): ActionReducer<any, any> {
    return function(state: State, action: any): State {
      const newState = reducer(state, action);
      console.log("action", action);
      console.log("oldState", state);
      console.log("newState", newState);
      return newState;
    };
  }
  
  export const metaReducers: MetaReducer<State>[] = !environment.production ? [
   logger
  ] : [];