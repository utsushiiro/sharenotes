import * as React from "react";
import { useDispatch } from "react-redux";
import { authOperations, authConstants } from "@state/auth";
import { useCallback, useEffect } from "react";
import { Formik, Form } from "formik";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import UsernameField from "@components/UsernameField";
import PasswordField from "@components/PasswordField";
import { useSelector } from "@state/store";
import { useSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const LoginPage: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const submitHadler = useCallback(
    (username: string, password: string) => {
      dispatch(authOperations.login(username, password));
    },
    [dispatch]
  );

  const events = useSelector(state => state.authState.events);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    events.forEach(event => {
      if (event.type === authConstants.eventTypes.FAILED_TO_LOGIN) {
        enqueueSnackbar("Login Failed", {
          variant: "error",
          autoHideDuration: 1500
        });
        dispatch(authOperations.deleteAuthEvent(event.id));
      } else if (event.type === authConstants.eventTypes.LOGGED_OUT) {
        enqueueSnackbar("Logged out", {
          variant: "success",
          autoHideDuration: 1000
        });
        dispatch(authOperations.deleteAuthEvent(event.id));
      }
    });
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          ShareNotes
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values, actions) => {
            submitHadler(values.username, values.password);
            actions.setSubmitting(false);
          }}
          render={() => (
            <Form className={classes.form} noValidate>
              <UsernameField />
              <PasswordField />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </Form>
          )}
        />
      </div>
    </Container>
  );
};

export default LoginPage;
