import { NotesState } from "./types";

export const actionTypes = {
  UPSERT_NOTE_ENTITIES: "UPSERT_NOTE_ENTITIES",
  DELETE_NOTE_ENTITY: "DELETE_NOTE_ENTITY",
  RESET_NOTE_ENTITIES: "RESET_NOTE_ENTITIES",
  START_NOTE_LOADING: "START_NOTE_LOADING",
  FINISH_NOTE_LOADING: "FINISH_NOTE_LOADING"
} as const;

export const actionCreators = {
  upsertNoteEntities: (noteEntities: NotesState["entities"]["byId"]) => ({
    type: actionTypes.UPSERT_NOTE_ENTITIES,
    payload: {
      noteEntities
    }
  }),
  deleteNoteEntity: (noteId: string) => ({
    type: actionTypes.DELETE_NOTE_ENTITY,
    payload: {
      noteId
    }
  }),
  resetNoteEntities: () => ({
    type: actionTypes.RESET_NOTE_ENTITIES
  }),
  startNoteLoading: () => ({
    type: actionTypes.START_NOTE_LOADING
  }),
  finishNoteLoading: () => ({
    type: actionTypes.FINISH_NOTE_LOADING
  })
};
