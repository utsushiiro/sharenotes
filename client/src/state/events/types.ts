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

export type EventAction = PickActionType<typeof eventsACs>;

export type EventState = {
  entities: {
    byId: {
      [eventId: string]: EventEntity;
    };
    idsByType: {
      [eventType: string]: string[] | undefined;
    };
  };
};
