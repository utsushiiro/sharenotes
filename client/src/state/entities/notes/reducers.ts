import { combineReducers, Reducer } from "redux";
import { NoteEntitiesState } from "./types";
import { Action } from "@state/types";
import { actionTypes } from "./actions";

const initialState: NoteEntitiesState = {
  byId: {},
  meta: {
    isLoading: false
  }
};

export const notesReducer = combineReducers<NoteEntitiesState, Action>({
  byId,
  meta
});

function byId(
  state = initialState.byId,
  action: Action
): NoteEntitiesState["byId"] {
  switch (action.type) {
    case actionTypes.UPSERT_NOTE_ENTITIES: {
      return {
        ...state,
        ...action.payload.noteEntities
      };
    }

    case actionTypes.DELETE_NOTE_ENTITY: {
      const { [action.payload.noteId]: _, newState } = state;
      return newState;
    }

    default:
      return state;
  }
}

function meta(
  state = initialState.meta,
  action: Action
): NoteEntitiesState["meta"] {
  switch (action.type) {
    case actionTypes.START_NOTE_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.FINISH_NOTE_LOADING:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
