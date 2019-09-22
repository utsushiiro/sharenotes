import { NotesAction, NotesState } from "./notes/types";
import { AuthAction, AuthState } from "./auth/types";
import { UsersAction, UsersState } from "./users/types";
import { EventAction, EventState } from "./events/types";

type Unbox<T> = T extends { [K in keyof T]: infer U } ? U : never;
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : PickActionType<T[K]>;
};
export type PickActionType<T> = Unbox<ReturnTypes<T>>;

export type Entity<
  Model,
  FK1 extends keyof Model,
  FK2 extends keyof Model
> = Omit<Model, FK1 | FK2> & { [K in FK1]: string } & { [K in FK2]: string[] };

// Deprecated: replace with RootState
export type State = {
  authState: AuthState;
  eventState: EventState;
  notesState: NotesState;
  usersState: UsersState;
};

export type Action = AuthAction | EventAction | NotesAction | UsersAction;
