import reducer, { initialState } from "./reducers";
import { actionTypes } from "./actions";
import { AuthState, AuthAction } from "./types";

describe("Auth Reducers", () => {
  test("START_AUTH_LOADING", () => {
    // setup
    const state: AuthState = {
      ...initialState,
      meta: {
        isLoading: false
      }
    };

    const action: AuthAction = {
      type: actionTypes.START_LOADING
    };

    const expected: AuthState = {
      ...initialState,
      meta: {
        isLoading: true
      }
    };

    // execute
    const result = reducer(state, action);

    // verify
    expect(result).toEqual(expected);
  });

  test("FINISH_AUTH_LOADING", () => {
    // setup
    const state: AuthState = {
      ...initialState,
      meta: {
        isLoading: true
      }
    };

    const action: AuthAction = {
      type: actionTypes.FINISH_LOADING
    };

    const expected: AuthState = {
      ...initialState,
      meta: {
        isLoading: false
      }
    };

    // execute
    const result = reducer(state, action);

    // verify
    expect(result).toEqual(expected);
  });
});
