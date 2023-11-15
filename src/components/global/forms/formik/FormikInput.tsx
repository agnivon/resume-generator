import { useField } from "formik";
import Input, { InputProps } from "../Input";

type FormikInputProps = InputProps & {
  name: string;
};

const FormikInput = (props: FormikInputProps) => {
  const { name, type, ...rest } = props;
  const [field, meta] = useField({ name, type });

  return (
    <Input
      type={type}
      {...field}
      {...rest}
      errorText={meta.error && meta.touched ? meta.error : undefined}
    />
  );
};

export default FormikInput;
