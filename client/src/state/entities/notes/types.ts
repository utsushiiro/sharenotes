import { PickActionType, Entity } from "@state/types";
import { actionCreators } from "./actions";
import { User } from "@state/entities/users/types";

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

export type NoteEntitiesAction = PickActionType<typeof actionCreators>;

export type NoteEntitiesState = {
  byId: {
    [noteId: string]: NoteEntity;
  };
  meta: {
    isLoading: boolean;
  };
};
