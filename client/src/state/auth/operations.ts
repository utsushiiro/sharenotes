import actions from "./actions";
import { Dispatch } from "redux";
import axios from "axios";
import { push } from "connected-react-router";
import api from "../api";
import storage from "../storage";

const login = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.login.started());

    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      const response = await axios.post(
        "http://localhost:3001/api/login",
        params,
        {
          withCredentials: true
        }
      );
      // TODO? fetch login User info
      const user = { name: username };
      dispatch(actions.login.done(user));
      storage.setLoginUser(user);
      dispatch(push("/"));
    } catch (err) {
      dispatch(actions.login.failed());
    }
  };
};

const logout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.logout.started());

    try {
      await api.post("http://localhost:3001/api/logout");
      dispatch(actions.logout.done());
      dispatch(push("/login"));
    } catch (err) {
      dispatch(actions.logout.failed());
    }
  };
};

export default {
  login,
  logout
};
