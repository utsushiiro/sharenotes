import { uniteProperties } from "../types";

export type Action = ReturnType<
    uniteProperties<typeof login>  
>;

export const actionTypes = {
    LOGIN: {
        STARTED: "LOGIN.STARTED",
        DONE: "LOGIN.DONE",
        FAILED: "LOGIN.FAILED"
    },
}

const login = {
    started: () => ({
      type: actionTypes.LOGIN.STARTED
    }),
  
    done: () => ({
      type: actionTypes.LOGIN.DONE,
      payload: {      
      }
    }),
  
    failed: () => ({
      type: actionTypes.LOGIN.FAILED
    })
  };