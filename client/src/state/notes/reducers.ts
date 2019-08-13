import { Reducer } from "redux";
import { NotesState, NotesAction } from "./types";
import { actionTypes } from "./actions";
import { v4 as uuid } from "uuid";

const initialState: NotesState = {
  notes: [],
  note: null,
  isFetching: false,
  events: []
};

const note: Reducer<NotesState, NotesAction> = (
  state = initialState,
  action
) => {
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
        isFetching: false
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

    case actionTypes.CREATE_NOTE_EVENT:
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
    case actionTypes.DELETE_NOTE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload.id)
      };
      0;

    default:
      const _: never = action;
      return state;
  }
};

export default note;
