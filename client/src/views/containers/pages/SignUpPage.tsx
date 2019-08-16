import * as React from "react";
import { useDispatch } from "react-redux";
import { authOperations } from "../../../state/auth";
import { useCallback } from "react";
import * as Yup from "yup";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import FormikTextField from "../../components/FormikTextField";

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

const SignUpFormSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z][a-zA-Z0-9]+/, "Invalid username")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .matches(/^[a-zA-Z0-9]{8,16}/, "Invalid password")
    .required("Required")
});

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
          validationSchema={SignUpFormSchema}
          onSubmit={(values, actions) => {
            submitHandler(values.username, values.email, values.password);
            actions.setSubmitting(false);
          }}
          render={() => (
            <Form className={classes.form} noValidate>
              <FormikTextField name="username" label="User Name" type="text" />
              <p className={classes.fieldDescription}>
                Please input username using half-width English numbers and
                letters, using more than 2 characters. <br />
                The first letter can not be a number.
              </p>
              <FormikTextField name="email" label="Email" type="text" />
              <FormikTextField
                name="password"
                label="Password"
                type="password"
              />
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
