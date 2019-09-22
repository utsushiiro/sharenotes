import { UsersState } from "./types";

export const actionTypes = {
  UPSERT_ENTITIES: "users/UPSERT_ENTITIES",
  DELETE_ENTITY: "users/DELETE_ENTITY",
  RESET_ENTITIES: "users/RESET_ENTITIES",
  START_LOADING: "users/START_LOADING",
  FINISH_LOADING: "users/FINISH_LOADING"
} as const;

const actionCreators = {
  upsertEntities: (userEntities: UsersState["entities"]["byId"]) => ({
    type: actionTypes.UPSERT_ENTITIES,
    payload: {
      userEntities
    }
  }),
  deleteEntity: (userId: string) => ({
    type: actionTypes.DELETE_ENTITY,
    payload: {
      userId
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
