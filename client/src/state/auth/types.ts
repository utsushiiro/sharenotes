import { actionCreators } from "./actions";
import { PickActionType } from "@state/types";
import { User } from "@state/users/types";

export type AuthAction = PickActionType<typeof actionCreators>;

export type AuthState = {
  isLoading: boolean;
  loginUser: User | null;
};
