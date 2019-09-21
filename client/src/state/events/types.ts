import { actionCreators } from "./actions";
import { PickActionType, Entity } from "@state/types";
import { eventTypes } from "./constants";

export type EventType = keyof (typeof eventTypes);

export type Event = {
  id: string;
  type: EventType;
  createdAt: string;
};

export type EventEntity = Entity<Event, never, never>;

export type EventAction = PickActionType<typeof actionCreators>;

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
