import * as React from "react";
import { Route, Redirect } from "react-router";
import { State } from "../../state/types";
import { connect } from "react-redux";
import { RouteProps } from "react-router";

type Props = {
  component: React.FC;
  isAuthenticated: boolean;
} & RouteProps;

const PrivateRoute: React.FC<Props> = (props) => {
  const {component: Component, isAuthenticated, ...rest} = props;
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

const mapStateToProps = ({ authState }: State) => {
  return {
    isAuthenticated: authState.loginUser !== null
  };
};

export default connect(mapStateToProps)(PrivateRoute);
