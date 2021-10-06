import { BusinessPartnerManagerState } from "./business-partner-state";
import { UserState } from "./user.reducer";

export interface AppState {
    businessPartner: BusinessPartnerManagerState;
    usersState:UserState
}