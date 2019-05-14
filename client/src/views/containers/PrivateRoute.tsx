import * as React from "react";
import { Route, Redirect } from "react-router";
import { State } from "../../state/types";
import { authSelectors } from "../../state/auth";
import { connect } from "react-redux";
import { RouteProps } from "react-router";

type Props = {
  component: React.FC;
  isLoggedIn: boolean;
} & RouteProps;

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  isLoggedIn,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
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

const mapStateToProps = ({ authState }: State) => {
  return {
    isLoggedIn: authSelectors.isLoggedIn(authState)
  };
};

export default connect(mapStateToProps)(PrivateRoute);
