import { actionCreators } from "./actions";
import { Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";
import { push } from "connected-react-router";
import api from "../../api";
import storage from "../storage";
import { User } from "./types";

const login = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.login.started());

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
      dispatch(actionCreators.login.done(user));
      dispatch(push("/"));
    } catch (err) {
      dispatch(actionCreators.login.failed());
    }
  };
};

const logout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.logout.started());

    try {
      await api.post("/api/v1/logout");
      storage.deleteLoginUser();
      dispatch(actionCreators.logout.done());
      dispatch(push("/login"));
    } catch (err) {
      dispatch(actionCreators.logout.failed());
    }
  };
};

const signUp = (username: string, email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.signUp.started());

    try {
      const response: AxiosResponse<User> = await axios.post("/api/v1/user", {
        username: username,
        email: email,
        password: password
      });

      const user = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email
      };
      storage.setLoginUser(user);
      dispatch(actionCreators.signUp.done(user));
      dispatch(push("/"));
    } catch (err) {
      dispatch(actionCreators.signUp.failed());
    }
  };
};

export default {
  login,
  logout,
  signUp
};
