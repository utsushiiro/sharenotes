import { actionCreators } from "./actions";
import { PickActionType } from "../types";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthAction = PickActionType<typeof actionCreators>;

export type AuthState = {
  loginUser: User | null;
  isLoading: boolean;
};
