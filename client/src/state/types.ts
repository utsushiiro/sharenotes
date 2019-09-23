import { NotesAction } from "@state/notes/types";
import { AuthAction } from "@state/auth/types";
import { UsersAction } from "@state/users/types";
import { EventsAction } from "@state/events/types";

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

export type Action = AuthAction | EventsAction | NotesAction | UsersAction;
