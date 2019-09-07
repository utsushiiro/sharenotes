import { Reducer } from "redux";
import { NotesState, NotesAction } from "./types";
import { actionTypes } from "./actions";

const initialState: NotesState = {
  isLoading: false,
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
        isLoading: true
      };
    case actionTypes.CREATE_NOTE.DONE:
      return {
        ...state,
        isLoading: false,
        notes: state.notes.concat(action.payload.note)
      };
    case actionTypes.CREATE_NOTE.FAILED:
      return {
        ...state,
        isLoading: false
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
    case actionTypes.GET_NOTE.DONE: {
      const notes = state.notes.filter(
        note => note.id !== action.payload.note.id
      );
      notes.push(action.payload.note);
      return {
        ...state,
        isLoading: false,
        notes
      };
    }
    case actionTypes.GET_NOTE.FAILED:
      return {
        ...state,
        isLoading: false
      };

    case actionTypes.UPDATE_NOTE.STARTED:
      return {
        ...state
      };
    case actionTypes.UPDATE_NOTE.DONE: {
      const notes = state.notes.filter(
        note => note.id !== action.payload.note.id
      );
      notes.push(action.payload.note);
      return {
        ...state,
        notes
      };
    }
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
