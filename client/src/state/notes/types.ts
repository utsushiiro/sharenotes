import { actionCreators } from "./actions";
import { PickActionType } from "@state/types";

export type Note = {
  id: number;
  title: string;
  content: string;
  version: number;
};

export type NotesAction = PickActionType<typeof actionCreators>;

export type NotesState = {
  isLoading: boolean;
  note: Note | null;
  notes: Note[];
};
