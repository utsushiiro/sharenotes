import { PickActionType, Entity } from "@state/types";
import { usersACs } from ".";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserEntity = Entity<User, never, never>;

export type UsersAction = PickActionType<typeof usersACs>;

export type UsersState = {
  entities: {
    byId: {
      [userId: string]: UserEntity | undefined;
    };
  };
  meta: {
    isLoading: boolean;
  };
};
