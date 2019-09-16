import { UserEntitiesState } from "./types";

export const actionTypes = {
  UPSERT_USER_ENTITIES: "UPSERT_USER_ENTITIES",
  DELETE_USER_ENTITY: "DELETE_USER_ENTITY",
  RESET_USER_ENTITIES: "RESET_USER_ENTITIES",
  START_USER_LOADING: "START_USER_LOADING",
  FINISH_USER_LOADING: "FINISH_USER_LOADING"
} as const;

export const actionCreators = {
  upsertUserEntities: (users: UserEntitiesState["byId"]) => ({
    type: actionTypes.UPSERT_USER_ENTITIES,
    payload: {
      users
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
