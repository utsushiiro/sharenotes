import { NotesState } from "./types";

export const actionTypes = {
  UPSERT_ENTITIES: "notes/UPSERT_ENTITIES",
  DELETE_ENTITY: "notes/DELETE_ENTITY",
  RESET_ENTITIES: "notes/RESET_ENTITIES",
  START_LOADING: "notes/START_LOADING",
  FINISH_LOADING: "notes/FINISH_LOADING"
} as const;

const actionCreators = {
  upsertEntities: (noteEntities: NotesState["entities"]["byId"]) => ({
    type: actionTypes.UPSERT_ENTITIES,
    payload: {
      noteEntities
    }
  }),
  deleteEntity: (noteId: string) => ({
    type: actionTypes.DELETE_ENTITY,
    payload: {
      noteId
    }
  }),
  resetEntities: () => ({
    type: actionTypes.RESET_ENTITIES
  }),
  startLoading: () => ({
    type: actionTypes.START_LOADING
  }),
  finishLoading: () => ({
    type: actionTypes.FINISH_LOADING
  })
};

export default actionCreators;
