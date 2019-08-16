import * as React from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  useField
} from "formik";

import TextField from "@material-ui/core/TextField";

type FormikTextFieldProps = {
  name: string;
  type: string;
  label: string;
};

const FormikTextField: React.FC<FormikTextFieldProps> = ({
  label,
  type,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      {...field}
      label={label}
      type={type}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    />
  );
};

export default FormikTextField;
