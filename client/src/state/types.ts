import { NotesState } from "./notes/types";

export type uniteProperties<T> = T[keyof T];

export type State = {
  notesState: NotesState;
};
