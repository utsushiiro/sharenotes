import reducer, { initialState } from "./reducers";
import { actionTypes } from "./actions";
import { EventAction, EventState } from "./types";
import { createTestEventEntity } from "@test-utils";

describe("Event Reducers", () => {
  test("CREATE_EVENT_ENTITY", () => {
    // setup
    const state: EventState = {
      ...initialState
    };

    const eventEntity = createTestEventEntity();

    const action: EventAction = {
      type: actionTypes.CREATE_EVENT_ENTITY,
      payload: {
        eventEntity: eventEntity
      }
    };

    const expected: EventState = {
      entities: {
        byId: {
          [eventEntity.id]: eventEntity
        }
      }
    };

    // execute
    const result = reducer(state, action);

    // verify
    expect(result).toEqual(expected);
  });

  test("DELETE_EVENT", () => {
    // setup
    const eventEntity = createTestEventEntity();

    const state: EventState = {
      ...initialState,
      entities: {
        byId: {
          [eventEntity.id]: eventEntity
        }
      }
    };

    const action: EventAction = {
      type: actionTypes.DELETE_EVENT_ENTITY,
      payload: {
        eventId: eventEntity.id
      }
    };

    const expected: EventState = {
      entities: {
        byId: {}
      }
    };

    // execute
    const result = reducer(state, action);

    // verify
    expect(result).toEqual(expected);
  });
});
