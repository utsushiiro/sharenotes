import { User } from "./types";

export const actionTypes = {
  SET_USER: "SET_USER",
  REMOVE_USER: "REMOVE_USER"
} as const;

export const actionCreators = {
  setUser: (user: User) => ({
    type: actionTypes.SET_USER,
    payload: {
      user
    }
  })
};
