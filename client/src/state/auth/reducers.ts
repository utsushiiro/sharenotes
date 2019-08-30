import { Reducer } from "redux";
import { AuthState, AuthAction } from "./types";
import { actionTypes } from "./actions";
import storage from "@state/storage";
import { v4 as uuid } from "uuid";

const initialState: AuthState = {
  isLoading: false,
  loginUser: storage.getLoginUser(),
  events: []
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

    case actionTypes.CREATE_AUTH_EVENT:
      return {
        ...state,
        events: state.events.concat([
          {
            id: uuid(),
            type: action.payload.type,
            createdAt: new Date().toISOString()
          }
        ])
      };
    case actionTypes.DELETE_AUTH_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload.id)
      };

    default:
      const _: never = action;
      return state;
  }
};

export default auth;
