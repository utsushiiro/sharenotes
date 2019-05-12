import * as React from "react";
import { Route, Redirect } from "react-router";
import { State } from "../../state/types";
import { authSelectors } from "../../state/auth";
import { connect } from "react-redux";
import { RouteProps } from "react-router";

type Props = {
  component: React.FC;
  isLogined: boolean;
} & RouteProps;

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  isLogined,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogined ? (
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
    isLogined: authSelectors.isLogined(authState)
  };
};

export default connect(mapStateToProps)(PrivateRoute);
