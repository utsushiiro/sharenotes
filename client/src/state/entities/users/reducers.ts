import { combineReducers } from "redux";
import { UserEntitiesState } from "./types";
import { Action } from "@state/types";
import { actionTypes } from "./actions";

const initialState: UserEntitiesState = {
  byId: {},
  meta: {
    isLoading: false
  }
};

export const usersReducer = combineReducers<UserEntitiesState, Action>({
  byId,
  meta
});

function byId(
  state = initialState.byId,
  action: Action
): UserEntitiesState["byId"] {
  switch (action.type) {
    case actionTypes.UPSERT_USER_ENTITIES: {
      return {
        ...state,
        ...action.payload.users
      };
    }

    case actionTypes.DELETE_USER_ENTITY: {
      const { [action.payload.userId]: _, newState } = state;
      return newState;
    }

    default:
      return state;
  }
}

function meta(
  state = initialState.meta,
  action: Action
): UserEntitiesState["meta"] {
  switch (action.type) {
    case actionTypes.START_USER_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.FINISH_USER_LOADING:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
