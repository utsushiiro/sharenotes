export type Note = {
  id: number;
  title: string;
  content: string;
};

export type NotesState = {
  notes: Note[];
  note: Note | null;
  isFetching: boolean;
};

// TODO /notesの外に出す
export type State = {
  notesState: NotesState;
};
