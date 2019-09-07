import { actionCreators } from "./actions";
import { PickActionType } from "@state/types";

export type Note = {
  id: string;
  title: string;
  content: string;
  version: string;
};

export type NotesAction = PickActionType<typeof actionCreators>;

export type NotesState = {
  isLoading: boolean;
  notes: Note[];
};
