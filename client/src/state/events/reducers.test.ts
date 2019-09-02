import reducer from "./reducers";
import { actionTypes } from "./actions";
import { EventAction, EventState } from "./types";
import constants from "./constants";

describe("Event Reducers", () => {
  test("CREATE_EVENT", () => {
    // setup
    const state: EventState = {
      events: []
    };

    const action: EventAction = {
      type: actionTypes.CREATE_EVENT,
      payload: {
        type: constants.eventTypes.LOGGED_IN
      }
    };

    // execute
    const result = reducer(state, action);

    // verify
    expect(result.events[0].type).toEqual(action.payload.type);
  });

  test("DELETE_EVENT", () => {
    // setup
    const state: EventState = {
      events: [{
        id: "XXX",
        type: constants.eventTypes.LOGGED_IN,
        createdAt: "XXX"
      }]
    };

    const action: EventAction = {
      type: actionTypes.DELETE_EVENT,
      payload: {
        id: "XXX"
      }
    };

    const expected: EventState = {
      events: []
    }

    // execute
    const result = reducer(state, action);

    // verify
    expect(result).toEqual(expected);
  });
});
