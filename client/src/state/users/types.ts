import { PickActionType } from "@state/types";
import { actionCreators } from "./actions";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type UsersAction = PickActionType<typeof actionCreators>;

export type UsersState = {
  users: User[];
};
