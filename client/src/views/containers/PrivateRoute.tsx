import * as React from "react";
import { Route, Redirect } from "react-router";
import { RouteProps } from "react-router";
import { useSelector } from "../../state/store";

type Props = {
  component: React.FC;
} & RouteProps;

const PrivateRoute: React.FC<Props> = props => {
  const { component: Component, ...rest } = props;
  const isAuthenticated = useSelector(
    state => state.authState.loginUser !== null
  );

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
