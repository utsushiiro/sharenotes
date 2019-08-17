import { Note, NotesEventType } from "./types";

export const actionTypes = {
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
  DELETE_NOTE: {
    STARTED: "DELETE_NOTE.STARTED",
    DONE: "DELETE_NOTE.DONE",
    FAILED: "DELETE_NOTE.FAILED"
  },
  CREATE_NOTES_EVENT: "CREATE_NOTES_EVENT",
  DELETE_NOTES_EVENT: "DELETE_NOTES_EVENT"
} as const;

export const actionCreators = {
  createNote: {
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
  },
  getNote: {
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
  },
  getNotes: {
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
  },
  updateNote: {
    started: () => ({
      type: actionTypes.UPDATE_NOTE.STARTED
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
  },
  deleteNote: {
    started: () => ({
      type: actionTypes.DELETE_NOTE.STARTED
    }),

    done: () => ({
      type: actionTypes.DELETE_NOTE.DONE
    }),

    failed: () => ({
      type: actionTypes.DELETE_NOTE.FAILED
    })
  },
  createNoteEvent: (type: NotesEventType) => ({
    type: actionTypes.CREATE_NOTES_EVENT,
    payload: {
      type
    }
  }),
  deleteNoteEvent: (id: string) => ({
    type: actionTypes.DELETE_NOTES_EVENT,
    payload: {
      id
    }
  })
};
