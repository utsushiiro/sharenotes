import { actionCreators } from "./actions";
import { noteEventTypes } from "./constants";
import { PickActionType } from "../types";

export type Note = {
  id: number;
  title: string;
  content: string;
  version: number;
};

export type NoteEventType = keyof (typeof noteEventTypes);

export type NoteEvent = {
  id: string;
  type: NoteEventType;
  createdAt: string;
};

export type NotesAction = PickActionType<typeof actionCreators>;

export type NotesState = {
  notes: Note[];
  note: Note | null;
  isFetching: boolean;
  events: NoteEvent[];
};
