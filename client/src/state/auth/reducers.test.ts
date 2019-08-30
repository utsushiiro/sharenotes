import reducer from "./reducers";
import { actionTypes } from "./actions";
import { User } from "./types";

describe("Auth Reducers", () => {
  describe("LOGIN", () => {
    test("STARTED", () => {
      // setup
      const state = {
        isLoading: false,
        loginUser: null,
        events: []
      };

      const action = {
        type: actionTypes.LOGIN.STARTED
      };

      const expected = {
        isLoading: true,
        loginUser: null,
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const user: User = {
        id: 0,
        email: "test@example.com",
        name: "test-name"
      };

      const state = {
        isLoading: true,
        loginUser: null,
        events: []
      };

      const action = {
        type: actionTypes.LOGIN.DONE,
        payload: {
          user
        }
      };

      const expected = {
        isLoading: false,
        loginUser: user,
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const state = {
        isLoading: true,
        loginUser: null,
        events: []
      };

      const action = {
        type: actionTypes.LOGIN.FAILED
      };

      const expected = {
        isLoading: false,
        loginUser: null,
        events: []
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
      const user: User = {
        id: 0,
        email: "test@example.com",
        name: "test-name"
      };

      const state = {
        isLoading: false,
        loginUser: user,
        events: []
      };

      const action = {
        type: actionTypes.LOGOUT.STARTED
      };

      const expected = {
        isLoading: true,
        loginUser: user,
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const user: User = {
        id: 0,
        email: "test@example.com",
        name: "test-name"
      };

      const state = {
        isLoading: true,
        loginUser: user,
        events: []
      };

      const action = {
        type: actionTypes.LOGOUT.DONE,
        payload: {
          user
        }
      };

      const expected = {
        isLoading: false,
        loginUser: null,
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const user: User = {
        id: 0,
        email: "test@example.com",
        name: "test-name"
      };

      const state = {
        isLoading: true,
        loginUser: user,
        events: []
      };

      const action = {
        type: actionTypes.LOGOUT.FAILED
      };

      const expected = {
        isLoading: false,
        loginUser: user,
        events: []
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
      const state = {
        isLoading: false,
        loginUser: null,
        events: []
      };

      const action = {
        type: actionTypes.SIGN_UP.STARTED
      };

      const expected = {
        isLoading: true,
        loginUser: null,
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("DONE", () => {
      // setup
      const user: User = {
        id: 0,
        email: "test@example.com",
        name: "test-name"
      };

      const state = {
        isLoading: true,
        loginUser: null,
        events: []
      };

      const action = {
        type: actionTypes.SIGN_UP.DONE,
        payload: {
          user
        }
      };

      const expected = {
        isLoading: false,
        loginUser: user,
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });

    test("FAILED", () => {
      // setup
      const state = {
        isLoading: true,
        loginUser: null,
        events: []
      };

      const action = {
        type: actionTypes.SIGN_UP.FAILED
      };

      const expected = {
        isLoading: false,
        loginUser: null,
        events: []
      };

      // execute
      const result = reducer(state, action);

      // verify
      expect(result).toEqual(expected);
    });
  });
});
