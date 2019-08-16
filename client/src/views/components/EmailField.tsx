import * as React from "react";
import { Field } from "formik";

import TextField from "@material-ui/core/TextField";

type Props = {
  enableValidation?: boolean;
}

const EmailField: React.FC<Props> = (props) => {
  return (
    <Field
      name="email"
      validate={
        props.enableValidation && 
        (async (value: string) => {
          if (!value) {
            return "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return "Invalid email address";
          }
          return undefined;
        })
      }
    >
      {({ field, meta }) => (
        <TextField
          {...field}
          label="Email"
          type="email"
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

export default EmailField;
