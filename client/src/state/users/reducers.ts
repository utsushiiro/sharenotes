import { Reducer } from "redux";
import { UsersState, UsersAction } from "./types";
import { actionTypes } from "./actions";

const initialState: UsersState = {
  users: []
};

const users: Reducer<UsersState, UsersAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionTypes.SET_USER: {
      const users = state.users.filter(
        user => user.id !== action.payload.user.id
      );
      users.push(action.payload.user);
      return {
        ...state,
        users
      };
    }

    default:
      // When the case label is only one, action type here does not be inferred as 'never'. (Why?)
      // const _: never = action;
      return state;
  }
};

export default users;
