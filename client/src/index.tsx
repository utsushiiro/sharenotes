import { render } from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "@state/store";
import App from "@containers/App";
import { ConnectedRouter } from "connected-react-router";
import { history } from "@state/store";
import { Switch, Route } from "react-router";
import LoginPage from "@containers/pages/LoginPage";
import SignUpPage from "@containers/pages/SignUpPage";
import PrivateRoute from "@containers/PrivateRoute";
import { SnackbarProvider } from "notistack";

const store = configureStore();

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/sign_up" component={SignUpPage} />
            <PrivateRoute component={App} />
          </Switch>
        </SnackbarProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById("app-root")
  );
});
