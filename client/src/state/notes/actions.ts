export type Action = ReturnType<typeof addNote | typeof deleteNote>;
export const actionTypes =  {
  ADD_NOTE: "ADD_NOTE",
  DELETE_NOTE: "DELETE_NOTE"
} as const;

let nextNoteId: number = 0;

export const addNote = (text: string) => ({
  type: actionTypes.ADD_NOTE,
  id: nextNoteId++,
  text
});

export const deleteNote = (id: number) => ({
  type: actionTypes.DELETE_NOTE,
  id: id
});

export default {
  addNote,
  deleteNote
};
