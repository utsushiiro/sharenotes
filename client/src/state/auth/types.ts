import { actionCreators } from "./actions";
import constants from "./constants";
import { PickActionType } from "../types";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthAction = PickActionType<typeof actionCreators>;

export type AuthEventType = keyof (typeof constants.eventTypes);

export type AuthEvent = {
  id: string;
  type: AuthEventType;
  createdAt: string;
};

export type AuthState = {
  isLoading: boolean;
  loginUser: User | null;
  events: AuthEvent[];
};
