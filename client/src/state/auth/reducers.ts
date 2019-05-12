import { Reducer } from "redux";
import { AuthState } from "./types";
import { Action, actionTypes } from "./actions";

const initialState: AuthState = {
  loginUser: null,
  isLoading: false
};

const auth: Reducer<AuthState, Action> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN.STARTED:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.LOGIN.DONE:
      return {
        ...state,
        loginUser: action.payload.user,
        isLoading: false
      };
    case actionTypes.LOGIN.FAILED:
      return {
        ...state,
        isLoading: false
      };
    default:
      const _: never = action;
      return state;
  }
};

export default auth;
