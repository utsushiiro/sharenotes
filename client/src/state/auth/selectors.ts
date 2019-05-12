import { createSelector } from "reselect";
import { AuthState, User } from "./types";

const loginUserSelector = (state: AuthState) => state.loginUser;
const isLogined = createSelector(
  [loginUserSelector],
  (loginUser: User) => {
    return loginUser != null;
  }
);

export default {
  isLogined
};
