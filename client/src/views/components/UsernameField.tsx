import * as React from "react";
import { Field } from "formik";

import TextField from "@material-ui/core/TextField";

type Props = {
  enableValidation?: boolean;
}

const UsernameField: React.FC<Props> = (props) => {
  return (
    <Field
      name="username"
      validate={
        props.enableValidation && 
        (async (value: string) => {
          if (!value) {
            return "Required";
          } else if (!/^[a-zA-Z][a-zA-Z0-9]+$/.test(value)) {
            return "Invalid username";
          }
          return "";
        })
      }
    >
      {({ field, meta }) => (
        <TextField
          {...field}
          label="User Name"
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

export default UsernameField;
