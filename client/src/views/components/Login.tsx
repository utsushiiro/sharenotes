import * as React from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

type Props = {
  
};

const Login: React.FC<Props> = ({
  
}) => {
  return (
    <div className="mt-3">
      <h2 className="mb-4">Login Page</h2>
      <Form>
        <FormGroup>
          <Label>Username</Label>
          <Input name="text" />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input name="password" />
        </FormGroup>
        <Button color="primary">Login</Button>
      </Form>
    </div>
  );
};

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = (

) => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
