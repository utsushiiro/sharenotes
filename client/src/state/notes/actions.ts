export type Action = ReturnType<typeof addNote | typeof deleteNote>;
export const actionTypes =  {
  ADD_NOTE: "ADD_NOTE",
  DELETE_NOTE: "DELETE_NOTE"
} as const;

let nextNoteId: number = 2;

const addNote = (title: string, content: string) => ({
  type: actionTypes.ADD_NOTE,
  payload: {
    id: nextNoteId++,
    title,
    content
  }
});

const deleteNote = (id: number) => ({
  type: actionTypes.DELETE_NOTE,
  payload: {
    id: id
  }
});

export default {
  addNote,
  deleteNote
};
