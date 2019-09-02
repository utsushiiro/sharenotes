import { EventState, EventAction } from "./types";
import { Reducer } from "redux";
import { actionTypes } from "./actions";
import { v4 as uuid } from "uuid";

const initialState: EventState = {
  events: []
};

const events: Reducer<EventState, EventAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionTypes.CREATE_EVENT:
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
    case actionTypes.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload.id)
      };

    default:
      const _: never = action;
      return state;
  }
};

export default events;
