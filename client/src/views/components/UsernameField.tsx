import * as React from "react";
import { Field } from "formik";

import TextField from "@material-ui/core/TextField";
import { apiGet } from "../../api";

type Props = {
  enableValidation?: boolean;
};

const UsernameField: React.FC<Props> = props => {
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
          } else {
            // TODO handing api error
            const response = await apiGet("/api/v1/users:exists", {
              params: { username: value }
            });
            return response.data.exists
              ? "This username is already in use."
              : undefined;
          }
        })
      }
    >
      {({ field, meta }) => (
        <TextField
          autoComplete="off"
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
