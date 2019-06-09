import { uniteProperties } from "../types";
import { User } from "./types";

export type Action = ReturnType<
  | uniteProperties<typeof login>
  | uniteProperties<typeof logout>
  | uniteProperties<typeof signUp>
>;

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

const login = {
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
};

const logout = {
  started: () => ({
    type: actionTypes.LOGOUT.STARTED
  }),

  done: () => ({
    type: actionTypes.LOGOUT.DONE
  }),

  failed: () => ({
    type: actionTypes.LOGOUT.FAILED
  })
};

const signUp = {
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
};

export default {
  login,
  logout,
  signUp
};
