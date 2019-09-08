import reducer from "./reducers";
import { actionTypes } from "./actions";
import { UsersState, UsersAction } from "./types";
import { createTestUser } from "@test-utils";

describe("Users Reducers", () => {
  test("SET_USER - when user to be set does not exist in the state", () => {
    // setup
    const state: UsersState = {
      users: [createTestUser({ id: "0" })]
    };

    const action: UsersAction = {
      type: actionTypes.SET_USER,
      payload: {
        user: createTestUser({ id: "1" })
      }
    };

    const expected = {
      users: [createTestUser({ id: "0" }), createTestUser({ id: "1" })]
    };

    // execute
    const result = reducer(state, action);

    // verify
    expect(result).toEqual(expected);
  });

  test("SET_USER - when user to be set exists in the state", () => {
    // setup
    const state: UsersState = {
      users: [
        createTestUser({ id: "0" }),
        createTestUser({ id: "1" }),
        createTestUser({ id: "2" })
      ]
    };

    const renamedUser = createTestUser({ id: "1", name: "renamed" });

    const action: UsersAction = {
      type: actionTypes.SET_USER,
      payload: {
        user: renamedUser
      }
    };

    const expected = {
      users: [
        createTestUser({ id: "0" }),
        createTestUser({ id: "2" }),
        renamedUser
      ]
    };

    // execute
    const result = reducer(state, action);

    // verify
    expect(result).toEqual(expected);
  });
});
