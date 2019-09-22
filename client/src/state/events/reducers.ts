import { EventState } from "./types";
import { Action } from "@state/types";
import { actionTypes } from "./actions";
import { combineReducers } from "redux";

export const initialState: EventState = {
  entities: {
    byId: {},
    idsByType: {}
  }
};

function byId(state = initialState["entities"]["byId"], action: Action) {
  switch (action.type) {
    case actionTypes.CREATE:
      return {
        ...state,
        [action.payload.eventEntity.id]: action.payload.eventEntity
      };

    case actionTypes.DELETE:
      const { [action.payload.eventId]: _, ...newState } = state;
      return newState;

    default:
      return state;
  }
}

function idsByType(
  state = initialState["entities"]["idsByType"],
  action: Action
) {
  switch (action.type) {
    case actionTypes.CREATE: {
      const eventType = action.payload.eventEntity.type;
      const events = state.eventType !== undefined ? state.eventType : [];
      return {
        ...state,
        [eventType]: events.concat(action.payload.eventEntity.id)
      };
    }

    case actionTypes.DELETE: {
      const eventType = action.payload.eventType;
      if (state[eventType] === undefined) {
        return state;
      }

      const newIds = state[eventType]!.filter(
        id => id !== action.payload.eventId
      );
      if (newIds.length === 0) {
        const { [eventType]: _, ...newState } = state;
        return newState;
      }

      return {
        ...state,
        [eventType]: newIds
      };
    }

    default:
      return state;
  }
}

const entities = combineReducers<EventState["entities"], Action>({
  byId,
  idsByType
});

const eventsReducer = combineReducers<EventState, Action>({
  entities
});

export default eventsReducer;
