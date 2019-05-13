import actions from "./actions";
import { Dispatch } from "redux";
import axios from "axios";
import { push } from "connected-react-router";

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
      dispatch(actions.login.done(response.data));
      dispatch(push("/"));
    } catch (err) {
      dispatch(actions.login.failed());
    }
  };
};

export default {
  login
};
