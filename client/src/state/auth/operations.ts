import { actionCreators } from "./actions";
import { Dispatch } from "redux";
import { push } from "connected-react-router";
import { apiPost } from "@api";
import storage from "@state/storage";
import { eventsOperations } from "@state/events";
import { eventTypes } from "@state/events/constants";

const login = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actionCreators.startAuthLoading());
      const response = await apiPost(
        "/api/v1/login",
        {
          body: {
            username,
            password
          }
        },
        { enableConvertJsonToForm: true, disable401Handler: true }
      );
      storage.setLoginUser(response.data);
      dispatch(actionCreators.setLoginUser(response.data));
      dispatch(actionCreators.finishAuthLoading());
      dispatch(eventsOperations.createEvent(eventTypes.LOGGED_IN));
      dispatch(push("/"));
    } catch (err) {
      dispatch(actionCreators.finishAuthLoading());
      dispatch(eventsOperations.createEvent(eventTypes.FAILED_TO_LOGIN));
    }
  };
};

const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actionCreators.startAuthLoading());
      await apiPost("/api/v1/logout");
      storage.deleteLoginUser();
      dispatch(actionCreators.setLoginUser(null));
      dispatch(actionCreators.finishAuthLoading());
      dispatch(eventsOperations.createEvent(eventTypes.LOGGED_OUT));
      dispatch(push("/login"));
    } catch (err) {
      dispatch(actionCreators.finishAuthLoading());
    }
  };
};

const signUp = (username: string, email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actionCreators.startAuthLoading());
      const response = await apiPost("/api/v1/users", {
        body: {
          username: username,
          email: email,
          password: password
        }
      });
      storage.setLoginUser(response.data);
      dispatch(actionCreators.setLoginUser(response.data));
      dispatch(actionCreators.finishAuthLoading());
      dispatch(eventsOperations.createEvent(eventTypes.SIGNED_UP));
      dispatch(push("/"));
    } catch (err) {
      dispatch(actionCreators.finishAuthLoading());
    }
  };
};

export default {
  login,
  logout,
  signUp
};
