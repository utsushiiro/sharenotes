import { PickActionType, Entity } from "@state/types";
import { eventTypes } from "./constants";
import { eventsACs } from ".";

export type EventType = keyof (typeof eventTypes);

export type Event = {
  id: string;
  type: EventType;
  createdAt: string;
};

export type EventEntity = Entity<Event, never, never>;

export type EventsAction = PickActionType<typeof eventsACs>;

export type EventsState = {
  entities: {
    byId: {
      [eventId: string]: EventEntity | undefined;
    };
    idsByType: {
      [eventType: string]: string[] | undefined;
    };
  };
};
