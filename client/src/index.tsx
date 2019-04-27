import { render } from "react-dom";
import * as React from 'react';
import { Provider } from "react-redux";
import configureStore from "./state/store";
import App from "./views/App";
import { ConnectedRouter } from 'connected-react-router'
import { history } from './state/store';

const store = configureStore();

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById("app-root")
  );
});