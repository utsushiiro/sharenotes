import { combineReducers } from "redux";
import { AuthState } from "./types";
import { actionTypes } from "./actions";
import storage from "@state/storage";
import { Action } from "@state/types";

export const initialState: AuthState = {
  values: {
    loginUser: storage.getLoginUser()
  },
  meta: {
    isLoading: false
  }
};

function values(
  state = initialState.values,
  action: Action
): AuthState["values"] {
  switch (action.type) {
    case actionTypes.SET_LOGIN_USER:
      return {
        ...state,
        loginUser: action.payload.user
      };

    default:
      return state;
  }
}

function meta(state = initialState.meta, action: Action): AuthState["meta"] {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.FINISH_LOADING:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

const authReducer = combineReducers<AuthState, Action>({
  values,
  meta
});

export default authReducer;
