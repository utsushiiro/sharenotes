import { Reducer } from "redux";
import { NotesState, State } from "./types";
import { Action, actionTypes } from "./actions";

const initialState: NotesState = {
  notes: [],
  note: null,
  isFetching: false
};

const note: Reducer<NotesState, Action> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_NOTE.STARTED:
      return {
        ...state,
        note: null,
        isFetching: true
      };
    case actionTypes.CREATE_NOTE.DONE:
      return {
        ...state,
        note: action.payload.note,
        isFetching: false
      };
    case actionTypes.CREATE_NOTE.FAILED:
      return {
        ...state,
        note: null,
        isFetching: false
      };

    case actionTypes.GET_NOTES.STARTED:
      return {
        ...state,
        notes: [],
        isFetching: true
      };
    case actionTypes.GET_NOTES.DONE:
      return {
        ...state,
        notes: action.payload.notes,
        isFetching: false
      };
    case actionTypes.GET_NOTES.FAILED:
      return {
        ...state,
        notes: [],
        isFetching: false
      };

    case actionTypes.GET_NOTE.STARTED:
      return {
        ...state,
        note: null,
        isFetching: true
      };
    case actionTypes.GET_NOTE.DONE:
      return {
        ...state,
        note: action.payload.note,
        isFetching: false
      };
    case actionTypes.GET_NOTE.FAILED:
      return {
        ...state,
        note: null,
        isFetching: false
      };

    case actionTypes.UPDATE_NOTE.STARTED:
      return {
        ...state,
        note: null,
        isFetching: true
      };
    case actionTypes.UPDATE_NOTE.DONE:
      return {
        ...state,
        note: action.payload.note,
        isFetching: false
      };
    case actionTypes.UPDATE_NOTE.FAILED:
      return {
        ...state,
        note: null,
        isFetching: false
      };

    case actionTypes.DELETE_NOTE.STARTED:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.DELETE_NOTE.DONE:
      return {
        ...state,
        isFetching: false
      };
    case actionTypes.DELETE_NOTE.FAILED:
      return {
        ...state,
        isFetching: false
      };

    default:
      const _: never = action;
      return state;
  }
};

export default note;
