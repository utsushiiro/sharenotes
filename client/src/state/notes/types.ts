import { actionCreators } from "./actions";
import { PickActionType, Entity } from "@state/types";
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

export type NoteEntity = Entity<Note, "updatedBy" | "createdBy", never>;

export type NotesAction = PickActionType<typeof actionCreators>;

export type NotesState = {
  entities: {
    byId: {
      [noteId: string]: NoteEntity;
    };
  };
  meta: {
    isLoading: boolean;
  };
};
