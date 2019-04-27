export type Note = {
  id: number;
  title: string;
  content: string;
}

export type NotesState = {
  notes: Note[];
}

export type State = {
  notesState: NotesState;
}