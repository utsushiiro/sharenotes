import { actionCreators } from "./actions";
import { PickActionType } from "@state/types";
import { User } from "@state/users/types";

export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  updatedBy: User;
  createdAt: string;
  createdBy: User;
  version: string;
};

export type NotesAction = PickActionType<typeof actionCreators>;

export type NotesState = {
  isLoading: boolean;
  notes: Note[];
};
