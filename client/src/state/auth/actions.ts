import { User } from "@state/users/types";

export const actionTypes = {
  SET_LOGIN_USER: "SET_LOGIN_USER",
  START_AUTH_LOADING: "START_AUTH_LOADING",
  FINISH_AUTH_LOADING: "FINISH_AUTH_LOADING"
} as const;

export const actionCreators = {
  setLoginUser: (user: User | null) => ({
    type: actionTypes.SET_LOGIN_USER,
    payload: {
      user
    }
  }),
  startAuthLoading: () => ({
    type: actionTypes.START_AUTH_LOADING
  }),
  finishAuthLoading: () => ({
    type: actionTypes.FINISH_AUTH_LOADING
  })
};
