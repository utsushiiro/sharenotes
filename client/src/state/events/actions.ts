import { EventType } from "./types";

export const actionTypes = {
  CREATE_EVENT: "CREATE_EVENT",
  DELETE_EVENT: "DELETE_EVENT"
} as const;

export const actionCreators = {
  createEvent: (type: EventType) => ({
    type: actionTypes.CREATE_EVENT,
    payload: {
      type
    }
  }),
  deleteEvent: (id: string) => ({
    type: actionTypes.DELETE_EVENT,
    payload: {
      id
    }
  })
};
