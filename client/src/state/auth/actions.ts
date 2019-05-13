import { uniteProperties } from "../types";
import { User } from "./types";

export type Action = ReturnType<uniteProperties<typeof login>>;

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
    type: actionTypes.LOGOUT.DONE,
  }),

  failed: () => ({
    type: actionTypes.LOGOUT.FAILED
  })
}

export default {
  login,
  logout,
};
