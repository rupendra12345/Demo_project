import { Action } from '@ngrx/store';
import { IUser } from './user';
import { UserActions, UserActionTypes } from './user.actions';

export interface UserState {
  users: IUser[],
  error: string
}

export const initialState: UserState = {
  users: [],
  error: ''
};

export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {

    case UserActionTypes.LoadUsers:
      return {
        ...state
      }

    case UserActionTypes.LoadUsersSuccess:
      return {
        ...state,
        users: action.payload.data,
        error: ''
      }

    case UserActionTypes.LoadUsersFailure:
      return {
        ...state,
        users: [],
        error: action.payload.error
      }

    default:
      return state;
  }
}
