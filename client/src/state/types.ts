import { NotesState } from "./notes/types";
import { AuthState } from "./auth/types";

export type uniteProperties<T> = T[keyof T];

export type State = {
  notesState: NotesState;
  authState: AuthState;
};
