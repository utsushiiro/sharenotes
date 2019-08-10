import actions from "./actions";
import { Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";
import { push } from "connected-react-router";
import api from "../api";
import storage from "../storage";
import { User } from "./types";

const login = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.login.started());

    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      const response: AxiosResponse<User> = await axios.post(
        "http://localhost:3001/api/v1/login",
        params,
        {
          withCredentials: true
        }
      );
      const user = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email
      };
      storage.setLoginUser(user);
      dispatch(actions.login.done(user));
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
      await api.post("http://localhost:3001/api/v1/logout");
      storage.deleteLoginUser();
      dispatch(actions.logout.done());
      dispatch(push("/login"));
    } catch (err) {
      dispatch(actions.logout.failed());
    }
  };
};

const signUp = (username: string, email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.signUp.started());

    try {
      const response: AxiosResponse<User> = await axios.post(
        "http://localhost:3001/api/v1/user",
        {
          username: username,
          email: email,
          password: password
        },
        {
          withCredentials: true
        }
      );

      const user = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email
      };
      storage.setLoginUser(user);
      dispatch(actions.signUp.done(user));
      dispatch(push("/"));
    } catch (err) {
      dispatch(actions.signUp.failed());
    }
  };
};

export default {
  login,
  logout,
  signUp
};
