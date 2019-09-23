import { EventType, EventEntity, Event } from "./types";
import uuid from "uuid/v4";
import dayjs from "dayjs";

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
        createdAt: dayjs(Date.now()).toISOString()
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
