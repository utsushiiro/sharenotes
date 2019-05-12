import * as React from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import { ThunkDispatch } from "redux-thunk";
import { State } from "../../state/types";
import { Action } from "redux";
import { authOperations } from "../../state/auth";
import { useState } from "react";

type Props = {
  onSubmit: (username: string, password: string) => void;
};

const Login: React.FC<Props> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <Container className="pt-4">
      <h2 className="mb-4">Login Page</h2>
      <Form onSubmit={onSubmitHandler}>
        <FormGroup>
          <Label>Username</Label>
          <Input
            name="text"
            onChange={e => {
              setUsername(e.currentTarget.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            name="password"
            onChange={e => {
              setPassword(e.currentTarget.value);
            }}
          />
        </FormGroup>
        <Button color="primary">Login</Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => {
  return {
    onSubmit: (username: string, password: string) => {
      dispatch(authOperations.login(username, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
