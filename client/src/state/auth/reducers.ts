import { Reducer } from "redux";
import { AuthState, AuthAction } from "./types";
import { actionTypes } from "./actions";
import storage from "@state/storage";

const initialState: AuthState = {
  isLoading: false,
  loginUser: storage.getLoginUser()
};

const auth: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN.STARTED:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.LOGIN.DONE:
      return {
        ...state,
        isLoading: false,
        loginUser: action.payload.user
      };
    case actionTypes.LOGIN.FAILED:
      return {
        ...state,
        isLoading: false
      };

    case actionTypes.LOGOUT.STARTED:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.LOGOUT.DONE:
      return {
        ...state,
        isLoading: false,
        loginUser: null
      };
    case actionTypes.LOGOUT.FAILED:
      return {
        ...state,
        isLoading: false
      };

    case actionTypes.SIGN_UP.STARTED:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.SIGN_UP.DONE:
      return {
        ...state,
        isLoading: false,
        loginUser: action.payload.user
      };
    case actionTypes.SIGN_UP.FAILED:
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
