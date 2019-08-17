import * as React from "react";
import { Field } from "formik";

import TextField from "@material-ui/core/TextField";
import { apiGet } from "../../api";

type Props = {
  enableValidation?: boolean;
};

const EmailField: React.FC<Props> = props => {
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
          } else {
            // TODO handing api error
            const response = await apiGet("/api/v1/users:exists", {
              params: { email: value }
            });
            return response.data.exists
              ? "This email is already in use."
              : undefined;
          }
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
