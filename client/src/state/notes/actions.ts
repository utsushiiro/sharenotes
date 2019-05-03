import { Note } from "./types";

export type Action = ReturnType<
  typeof deleteNote |
  uniteProperties<typeof createNote> |
  uniteProperties<typeof getNotes> | 
  uniteProperties<typeof getNote> |
  uniteProperties<typeof updateNote>
>;
type uniteProperties<T> = T[keyof T];

export const actionTypes =  {
  DELETE_NOTE: "DELETE_NOTE",
  CREATE_NOTE: {
    STARTED: "CREATE_NOTE.STARTED",
    DONE: "CREATE_NOTE.DONE",
    FAILED: "CREATE_NOTE.FAILED"
  },
  GET_NOTES: {
    STARTED: "GET_NOTES.STARTED",
    DONE: "GET_NOTES.DONE",
    FAILED: "GET_NOTES.FAILED"
  },
  GET_NOTE: {
    STARTED: "GET_NOTE.STARTED",
    DONE: "GET_NOTE.DONE",
    FAILED: "GET_NOTE.FAILED"
  },
  UPDATE_NOTE: {
    STARTED: "UPDATE_NOTE.STARTED",
    DONE: "UPDATE_NOTE.DONE",
    FAILED: "UPDATE_NOTE.FAILED"
  },
} as const;

const createNote = {
  started: () => ({
    type: actionTypes.CREATE_NOTE.STARTED
  }),

  done: (note: Note) => ({
    type: actionTypes.CREATE_NOTE.DONE,
    payload: {
      note
    }
  }),

  failed: () => ({
    type: actionTypes.CREATE_NOTE.FAILED
  })
};

const getNote = {
  started: () => ({
    type: actionTypes.GET_NOTE.STARTED
  }),

  done: (note: Note) => ({
    type: actionTypes.GET_NOTE.DONE,
    payload: {
      note
    }
  }),

  failed: () => ({
    type: actionTypes.GET_NOTE.FAILED
  })
};

const getNotes = {
  started: () => ({
    type: actionTypes.GET_NOTES.STARTED
  }),

  done: (notes: Note[]) => ({
    type: actionTypes.GET_NOTES.DONE,
    payload: {
      notes
    }
  }),

  failed: () => ({
    type: actionTypes.GET_NOTES.FAILED
  })
};

const updateNote = {
  started: () => ({
    type: actionTypes.UPDATE_NOTE.STARTED,
  }),

  done: (note: Note) => ({
    type: actionTypes.UPDATE_NOTE.DONE,
    payload: {
      note
    }
  }),

  failed: () => ({
    type: actionTypes.UPDATE_NOTE.FAILED
  })
};

const deleteNote = (id: number) => ({
  type: actionTypes.DELETE_NOTE,
  payload: {
    id: id
  }
});

export default {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
