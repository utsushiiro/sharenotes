import { createSelector } from "reselect";
import { AuthState, User } from "./types";

const loginUserSelector = (state: AuthState) => state.loginUser;

const getUserId = createSelector(
  [loginUserSelector],
  (loginUser: User) => {
    return loginUser.id;
  }
);

const isLoggedIn = createSelector(
  [loginUserSelector],
  (loginUser: User) => {
    return loginUser != null;
  }
);

export default {
  getUserId,
  isLoggedIn
};
