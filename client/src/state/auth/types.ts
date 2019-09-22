import { PickActionType } from "@state/types";
import { User } from "@state/users/types";
import { authACs } from ".";

export type AuthAction = PickActionType<typeof authACs>;

export type AuthState = {
  values: {
    loginUser: User | null;
  };
  meta: {
    isLoading: boolean;
  };
};
