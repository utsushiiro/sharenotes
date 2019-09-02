import { actionCreators } from "./actions";
import constants from "./constants";
import { PickActionType } from "@state/types";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthAction = PickActionType<typeof actionCreators>;

export type AuthEventType = keyof (typeof constants.eventTypes);

export type AuthState = {
  isLoading: boolean;
  loginUser: User | null;
};
