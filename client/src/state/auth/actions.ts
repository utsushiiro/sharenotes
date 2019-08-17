import { User, AuthEventType } from "./types";

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
  },
  CREATE_AUTH_EVENT: "CREATE_AUTH_EVENT",
  DELETE_AUTH_EVENT: "DELETE_AUTH_EVENT"
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
  },
  createAuthEvent: (type: AuthEventType) => ({
    type: actionTypes.CREATE_AUTH_EVENT,
    payload: {
      type
    }
  }),
  deleteAuthEvent: (id: string) => ({
    type: actionTypes.DELETE_AUTH_EVENT,
    payload: {
      id
    }
  })
};
