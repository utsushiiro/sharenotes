import { combineReducers } from "redux";
import { NotesState } from "./types";
import { actionTypes } from "./actions";
import { Action } from "@state/types";

export const initialState: NotesState = {
  entities: { byId: {} },
  meta: {
    isLoading: false
  }
};

function byId(
  state = initialState.entities.byId,
  action: Action
): NotesState["entities"]["byId"] {
  switch (action.type) {
    case actionTypes.UPSERT_ENTITIES: {
      return {
        ...state,
        ...action.payload.noteEntities
      };
    }

    case actionTypes.DELETE_ENTITY: {
      const { [action.payload.noteId]: _, ...newState } = state;
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

function meta(state = initialState.meta, action: Action): NotesState["meta"] {
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

const entities = combineReducers<NotesState["entities"], Action>({
  byId
});

export const notesReducer = combineReducers<NotesState, Action>({
  entities,
  meta
});

export default notesReducer;
