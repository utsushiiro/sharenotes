import { EventType, EventEntity, Event } from "./types";
import { v4 as uuid } from "uuid";

export const actionTypes = {
  CREATE: "events/CREATE",
  DELETE: "events/DELETE"
} as const;

export const actionCreators = {
  createEventEntity: (type: EventType) => ({
    type: actionTypes.CREATE,
    payload: {
      eventEntity: {
        id: uuid(),
        type,
        createdAt: new Date().toISOString()
      } as EventEntity
    }
  }),
  deleteEventEntity: (event: Event) => ({
    type: actionTypes.DELETE,
    payload: {
      eventId: event.id,
      eventType: event.type
    }
  })
};
