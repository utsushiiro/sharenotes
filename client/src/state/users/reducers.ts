import { combineReducers } from "redux";
import { UsersState } from "./types";
import { actionTypes } from "./actions";
import { Action } from "@state/types";

export const initialState: UsersState = {
  entities: {
    byId: {}
  },
  meta: {
    isLoading: false
  }
};

function byId(
  state = initialState.entities.byId,
  action: Action
): UsersState["entities"]["byId"] {
  switch (action.type) {
    case actionTypes.UPSERT_ENTITIES: {
      return {
        ...state,
        ...action.payload.userEntities
      };
    }

    case actionTypes.DELETE_ENTITY: {
      const { [action.payload.userId]: _, ...newState } = state;
      return newState;
    }

    case actionTypes.RESET_ENTITIES: {
      return {
        ...initialState.entities.byId
      };
    }

    default:
      return state;
  }
}

function meta(state = initialState.meta, action: Action): UsersState["meta"] {
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

const entities = combineReducers<UsersState["entities"], Action>({
  byId
});

export const usersReducer = combineReducers<UsersState, Action>({
  entities,
  meta
});

export default usersReducer;
