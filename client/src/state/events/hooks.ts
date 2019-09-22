import { EventType, Event } from "./types";
import { useSelector } from "@state/store";
import { useSnackbar, OptionsObject } from "notistack";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { eventsACs } from ".";

export type EventToasterDefs = {
  eventType: EventType;
  toasterOptions: ToasterOptions;
}[];

type ToasterOptions = {
  message: string;
} & OptionsObject;

export function useEventToaster(defs: EventToasterDefs) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const eventsById = useSelector(state => state.eventsState.entities.byId);
  const eventIdsByType = useSelector(
    state => state.eventsState.entities.idsByType
  );

  useEffect(() => {
    defs.forEach(def => {
      const eventsIds = eventIdsByType[def.eventType];
      if (eventsIds === undefined) return;

      eventsIds.forEach(eventId => {
        const event = eventsById[eventId];
        if (event === undefined) return;
        enqueueSnackbar(def.toasterOptions.message, {
          ...def.toasterOptions
        });
        dispatch(eventsACs.deleteEntity(event));
      });
    });
  });
}
