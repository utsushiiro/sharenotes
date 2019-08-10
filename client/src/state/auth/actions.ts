import { User } from "./types";

export const actionTypes = {
  LOGIN: {
    STARTED: "LOGIN.STARTED",
    DONE: "LOGIN.DONE",
    FAILED: "LOGIN.FAILED"
  },
  LOGOUT: {
    STARTED: "LOGOUT.STARTED",
    DONE: "LOGOUT.DONE",
    FAILED: "LOGOUT.FAILED"
  },
  SIGN_UP: {
    STARTED: "SIGN_UP.STARTED",
    DONE: "SIGN_UP.DONE",
    FAILED: "SIGN_UP.FAILED"
  }
} as const;

export const actionCreators = {
  login: {
    started: () => ({
      type: actionTypes.LOGIN.STARTED
    }),
    done: (user: User) => ({
      type: actionTypes.LOGIN.DONE,
      payload: {
        user
      }
    }),
    failed: () => ({
      type: actionTypes.LOGIN.FAILED
    })
  },
  logout: {
    started: () => ({
      type: actionTypes.LOGOUT.STARTED
    }),

    done: () => ({
      type: actionTypes.LOGOUT.DONE
    }),

    failed: () => ({
      type: actionTypes.LOGOUT.FAILED
    })
  },
  signUp: {
    started: () => ({
      type: actionTypes.SIGN_UP.STARTED
    }),
    done: (user: User) => ({
      type: actionTypes.SIGN_UP.DONE,
      payload: {
        user
      }
    }),
    failed: () => ({
      type: actionTypes.SIGN_UP.FAILED
    })
  }
};
