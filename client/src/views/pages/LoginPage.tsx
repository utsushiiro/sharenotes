import * as React from "react";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import UsernameField from "@components/UsernameField";
import PasswordField from "@components/PasswordField";
import { eventTypes } from "@state/events/constants";
import { EventToasterDefs, useEventToaster } from "@state/events/hooks";
import { useAuth } from "@state/auth/hooks";
import { useRouter } from "@state/router/hooks";

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

const eventToasterDefs = [
  {
    eventType: eventTypes.FAILED_TO_LOGIN,
    toasterOptions: {
      message: "Login Failed",
      variant: "error",
      autoHideDuration: 1500
    }
  },
  {
    eventType: eventTypes.LOGGED_OUT,
    toasterOptions: {
      message: "Logged out",
      variant: "success",
      autoHideDuration: 1500
    }
  }
] as EventToasterDefs;

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const { login } = useAuth();
  const router = useRouter();

  // event toaster
  useEventToaster(eventToasterDefs);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          ShareNotes
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, actions) => {
            await login(values.username, values.password);
            actions.setSubmitting(false);
            router.push("/");
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
