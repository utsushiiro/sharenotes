import {noteEventTypes} from "./constants";

export type Note = {
  id: number;
  title: string;
  content: string;
};

export type NoteEventType = keyof (typeof noteEventTypes);

export type NoteEvent = {
  id: string;
  type: NoteEventType;
  createdAt:string;
};

export type NotesState = {
  notes: Note[];
  note: Note | null;
  isFetching: boolean;
  events: NoteEvent[];
};
