import { AuthEventType } from "@state/auth/types";
import { NotesEventType } from "@state/notes/types";
import { actionCreators } from "./actions";
import { PickActionType } from "@state/types";

export type EventType = AuthEventType | NotesEventType;

export type Event = {
  id: string;
  type: EventType;
  createdAt: string;
};

export type EventAction = PickActionType<typeof actionCreators>;

export type EventState = {
  events: Event[];
};
