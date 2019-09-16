import { PickActionType, Entity } from "@state/types";
import { actionCreators } from "./actions";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserEntity = Entity<User, never, never>;

export type UserEntitiesAction = PickActionType<typeof actionCreators>;

export type UserEntitiesState = {
  byId: {
    [userId: string]: UserEntity;
  };
  meta: {
    isLoading: boolean;
  };
};
