import { actionCreators } from "./actions";
import { PickActionType } from "@state/types";
import constants from "./constants";

export type EventType = keyof(typeof constants.eventTypes);

export type Event = {
  id: string;
  type: EventType;
  createdAt: string;
};

export type EventAction = PickActionType<typeof actionCreators>;

export type EventState = {
  events: Event[];
};
