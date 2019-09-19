import { EventType, EventEntity } from "./types";
import { v4 as uuid } from "uuid";

export const actionTypes = {
  CREATE_EVENT_ENTITY: "CREATE_EVENT_ENTITY",
  DELETE_EVENT_ENTITY: "DELETE_EVENT_ENTITY"
} as const;

export const actionCreators = {
  createEventEntity: (type: EventType) => ({
    type: actionTypes.CREATE_EVENT_ENTITY,
    payload: {
      eventEntity: {
        id: uuid(),
        type,
        createdAt: new Date().toISOString()
      } as EventEntity
    }
  }),
  deleteEventEntity: (eventId: string) => ({
    type: actionTypes.DELETE_EVENT_ENTITY,
    payload: {
      eventId
    }
  })
};
