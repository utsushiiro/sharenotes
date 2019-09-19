import { EventState } from "./types";
import { combineReducers } from "redux";
import { actionTypes } from "./actions";
import { Action } from "@state/types";

export const initialState: EventState = {
  entities: {
    byId: {}
  }
};

function byId(state = initialState["entities"]["byId"], action: Action) {
  switch (action.type) {
    case actionTypes.CREATE_EVENT_ENTITY:
      return {
        ...state,
        [action.payload.eventEntity.id]: action.payload.eventEntity
      };

    case actionTypes.DELETE_EVENT_ENTITY:
      const { [action.payload.eventId]: _, ...newState } = state;
      return newState;

    default:
      return state;
  }
}

const entities = combineReducers<EventState["entities"], Action>({
  byId
});

export const eventsReducer = combineReducers<EventState, Action>({
  entities
});

export default eventsReducer;
