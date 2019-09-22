import { User } from "@state/users/types";

export const actionTypes = {
  SET_LOGIN_USER: "auth/SET_LOGIN_USER",
  START_LOADING: "auth/START_LOADING",
  FINISH_LOADING: "auth/FINISH_LOADING"
} as const;

const actionCreators = {
  setLoginUser: (user: User | null) => ({
    type: actionTypes.SET_LOGIN_USER,
    payload: {
      user
    }
  }),
  startLoading: () => ({
    type: actionTypes.START_LOADING
  }),
  finishLoading: () => ({
    type: actionTypes.FINISH_LOADING
  })
};

export default actionCreators;
