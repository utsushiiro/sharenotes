import { UsersState } from "./types";

export const actionTypes = {
  UPSERT_USER_ENTITIES: "UPSERT_USER_ENTITIES",
  DELETE_USER_ENTITY: "DELETE_USER_ENTITY",
  RESET_USER_ENTITIES: "RESET_USER_ENTITIES",
  START_USER_LOADING: "START_USER_LOADING",
  FINISH_USER_LOADING: "FINISH_USER_LOADING"
} as const;

export const actionCreators = {
  upsertUserEntities: (userEntities: UsersState["entities"]["byId"]) => ({
    type: actionTypes.UPSERT_USER_ENTITIES,
    payload: {
      userEntities
    }
  }),
  deleteUserEntity: (userId: string) => ({
    type: actionTypes.DELETE_USER_ENTITY,
    payload: {
      userId
    }
  }),
  resetUserEntities: () => ({
    type: actionTypes.RESET_USER_ENTITIES
  }),
  startUserLoading: () => ({
    type: actionTypes.START_USER_LOADING
  }),
  finishUserLoading: () => ({
    type: actionTypes.FINISH_USER_LOADING
  })
};
