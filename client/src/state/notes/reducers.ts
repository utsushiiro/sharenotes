import { Reducer } from "redux";
import { NotesState, NotesAction } from "./types";
import { actionTypes } from "./actions";
import { v4 as uuid } from "uuid";

const initialState: NotesState = {
  isLoading: false,
  note: null,
  notes: []
};

const notes: Reducer<NotesState, NotesAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionTypes.CREATE_NOTE.STARTED:
      return {
        ...state,
        isLoading: true,
        note: null
      };
    case actionTypes.CREATE_NOTE.DONE:
      return {
        ...state,
        isLoading: false,
        note: action.payload.note
      };
    case actionTypes.CREATE_NOTE.FAILED:
      return {
        ...state,
        isLoading: false,
        note: null
      };

    case actionTypes.GET_NOTES.STARTED:
      return {
        ...state,
        isLoading: true,
        notes: []
      };
    case actionTypes.GET_NOTES.DONE:
      return {
        ...state,
        isLoading: false,
        notes: action.payload.notes
      };
    case actionTypes.GET_NOTES.FAILED:
      return {
        ...state,
        isLoading: false,
        notes: []
      };

    case actionTypes.GET_NOTE.STARTED:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.GET_NOTE.DONE:
      return {
        ...state,
        isLoading: false,
        note: action.payload.note
      };
    case actionTypes.GET_NOTE.FAILED:
      return {
        ...state,
        isLoading: false
      };

    case actionTypes.UPDATE_NOTE.STARTED:
      return {
        ...state
      };
    case actionTypes.UPDATE_NOTE.DONE:
      return {
        ...state,
        note: action.payload.note
      };
    case actionTypes.UPDATE_NOTE.FAILED:
      return {
        ...state
      };

    case actionTypes.DELETE_NOTE.STARTED:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.DELETE_NOTE.DONE:
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.DELETE_NOTE.FAILED:
      return {
        ...state,
        isLoading: false
      };

    default:
      const _: never = action;
      return state;
  }
};

export default notes;
