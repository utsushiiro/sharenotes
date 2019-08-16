import * as React from "react";
import { Field } from "formik";

import TextField from "@material-ui/core/TextField";

type Props = {
  enableValidation?: boolean;
}

const PasswordField: React.FC<Props> = (props) => {
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
      {({ field, meta }) => (
        <TextField
          {...field}
          label="Password"
          type="text"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
        />
      )}
    </Field>
  );
};

export default PasswordField;
