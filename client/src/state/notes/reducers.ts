import { Reducer } from "redux";
import { NotesState, State } from "./types";
import { Action, actionTypes } from "./actions";

const initialState: NotesState = {
  notes: [
    {
      id: 0,
      title: 'hoge title',
      content: 'hoge content'
    },
    {
      id: 1,
      title:'fuga title',
      content: 'fuga content'
    }
  ]
};

const note: Reducer<NotesState, Action> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTE:
      return {
        ...state,
        notes: state.notes.concat(
            {
              id: action.payload.id,
              title: action.payload.title,
              content: action.payload.content
            }
        )
      };
    case actionTypes.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload.id)
      };
    default:
      const _: never = action;
      return state;
  }
};

export default note;
