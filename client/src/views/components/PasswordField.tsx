import * as React from "react";
import { Field, FieldProps } from "formik";

import TextField from "@material-ui/core/TextField";

type Props = {
  enableValidation?: boolean;
};

const PasswordField: React.FC<Props> = props => {
  return (
    <Field
      name="password"
      validate={
        props.enableValidation &&
        (async (value: string) => {
          if (!value) {
            return "Required";
          } else if (!/^[a-zA-Z0-9]{8,16}$/.test(value)) {
            return "Invalid password";
          }
          return undefined;
        })
      }
    >
      {(props: FieldProps) => (
        <TextField
          {...props.field}
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          error={props.meta.touched && !!props.meta.error}
          helperText={props.meta.touched && props.meta.error}
        />
      )}
    </Field>
  );
};

export default PasswordField;
