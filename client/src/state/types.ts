import { NotesState, NotesAction } from "./notes/types";
import { AuthState, AuthAction } from "./auth/types";

type Unbox<T> = T extends { [K in keyof T]: infer U } ? U : never;
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : PickActionType<T[K]>;
};
export type PickActionType<T> = Unbox<ReturnTypes<T>>;

export type State = {
  notesState: NotesState;
  authState: AuthState;
};

export type Action = NotesAction | AuthAction;
