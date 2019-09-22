import { EventType, EventEntity, Event } from "./types";
import { v4 as uuid } from "uuid";

export const actionTypes = {
  CREATE: "events/CREATE",
  DELETE: "events/DELETE"
} as const;

const actionCreators = {
  createEntity: (type: EventType) => ({
    type: actionTypes.CREATE,
    payload: {
      eventEntity: {
        id: uuid(),
        type,
        createdAt: new Date().toISOString()
      } as EventEntity
    }
  }),
  deleteEntity: (event: Event) => ({
    type: actionTypes.DELETE,
    payload: {
      eventId: event.id,
      eventType: event.type
    }
  })
};

export default actionCreators;
