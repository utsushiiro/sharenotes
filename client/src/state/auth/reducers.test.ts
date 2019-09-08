import reducer from "./reducers";
import { actionTypes } from "./actions";
import { createTestUser } from "@test-utils";
import { AuthState, AuthAction } from "./types";

describe("Auth Reducers", () => {
  describe("LOGIN", () => {
    test("STARTED", () => {
      // setup
      const state: AuthState = {
        isLoading: false,
        loginUser: null
      };

      const action = {
        type: actionTypes.LOGIN.STARTED
      };

      const expected: AuthState = {
        isLoading: true,
        loginUser: null
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const user = createTestUser();

      const state: AuthState = {
        isLoading: true,
        loginUser: null
      };

      const action: AuthAction = {
        type: actionTypes.LOGIN.DONE,
        payload: {
          user
        }
      };

      const expected: AuthState = {
        isLoading: false,
        loginUser: user
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const state: AuthState = {
        isLoading: true,
        loginUser: null
      };

      const action: AuthAction = {
        type: actionTypes.LOGIN.FAILED
      };

      const expected: AuthState = {
        isLoading: false,
        loginUser: null
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });

  describe("LOGOUT", () => {
    test("STARTED", () => {
      // setup
      const user = createTestUser();

      const state: AuthState = {
        isLoading: false,
        loginUser: user
      };

      const action: AuthAction = {
        type: actionTypes.LOGOUT.STARTED
      };

      const expected: AuthState = {
        isLoading: true,
        loginUser: user
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const user = createTestUser();

      const state: AuthState = {
        isLoading: true,
        loginUser: user
      };

      const action: AuthAction = {
        type: actionTypes.LOGOUT.DONE
      };

      const expected: AuthState = {
        isLoading: false,
        loginUser: null
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const user = createTestUser();

      const state: AuthState = {
        isLoading: true,
        loginUser: user
      };

      const action: AuthAction = {
        type: actionTypes.LOGOUT.FAILED
      };

      const expected: AuthState = {
        isLoading: false,
        loginUser: user
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });

  describe("SIGN_UP", () => {
    test("STARTED", () => {
      // setup
      const state: AuthState = {
        isLoading: false,
        loginUser: null
      };

      const action: AuthAction = {
        type: actionTypes.SIGN_UP.STARTED
      };

      const expected: AuthState = {
        isLoading: true,
        loginUser: null
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const user = createTestUser();

      const state: AuthState = {
        isLoading: true,
        loginUser: null
      };

      const action: AuthAction = {
        type: actionTypes.SIGN_UP.DONE,
        payload: {
          user
        }
      };

      const expected: AuthState = {
        isLoading: false,
        loginUser: user
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const state: AuthState = {
        isLoading: true,
        loginUser: null
      };

      const action: AuthAction = {
        type: actionTypes.SIGN_UP.FAILED
      };

      const expected: AuthState = {
        isLoading: false,
        loginUser: null
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });
});
