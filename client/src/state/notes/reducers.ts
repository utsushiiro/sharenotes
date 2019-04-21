import { Reducer } from "redux";
import { State } from "./types";
import { Action, actionTypes } from "./actions";

const initialState = {
  notes: [
    {
      id: 0,
      text: 'hoge'
    },
    {
      id: 1,
      text: 'fuga'
    }
  ]
};

const note: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTE:
      return {
        ...state,
        notes: state.notes.concat(
            {
              id: action.id,
              text: action.text
            }
        )
      };
    case actionTypes.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.id)
      };
    default:
      const _: never = action;
      return state;
  }
};

export default note;
