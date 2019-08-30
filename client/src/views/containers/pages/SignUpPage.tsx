import * as React from "react";
import { useDispatch } from "react-redux";
import { authOperations } from "@state/auth";
import { useCallback } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import EmailField from "@components/EmailField";
import UsernameField from "@components/UsernameField";
import PasswordField from "@components/PasswordField";

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
  fieldDescription: {
    fontSize: "12px"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUpPage: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const submitHandler = useCallback(
    (username: string, email: string, password: string) => {
      dispatch(authOperations.signUp(username, email, password));
    },
    [dispatch]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          ShareNotes
        </Typography>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={(values, actions) => {
            submitHandler(values.username, values.email, values.password);
            actions.setSubmitting(false);
          }}
          render={() => (
            <Form className={classes.form} noValidate>
              <UsernameField enableValidation />
              <p className={classes.fieldDescription}>
                Please input username using half-width English numbers and
                letters, using more than 2 characters. <br />
                The first letter can not be a number.
              </p>
              <EmailField enableValidation />
              <PasswordField enableValidation />
              <p className={classes.fieldDescription}>
                Please input password using half-width English numbers and
                letters, using more than 8 characters but less than 16.
              </p>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </Form>
          )}
        />
      </div>
    </Container>
  );
};

export default SignUpPage;
