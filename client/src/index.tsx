import { render } from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "./state/store";
import App from "./views/containers/App";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./state/store";
import { Switch, Route } from "react-router";
import Login from "./views/components/Login";
import SignUp from "./views/components/SignUp";
import PrivateRoute from "./views/containers/PrivateRoute";

const store = configureStore();

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign_up" component={SignUp} />
          <PrivateRoute component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>,
    document.getElementById("app-root")
  );
});
