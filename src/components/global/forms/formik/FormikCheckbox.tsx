import { useField } from "formik";
import Input, { InputProps } from "../Input";
import Checkbox, { CheckboxProps } from "../Checkbox";

type FormikCheckboxProps = CheckboxProps & {
  name: string;
};

const FormikCheckbox = (props: FormikCheckboxProps) => {
  const { name, ...rest } = props;
  const [field, meta] = useField({ name, type: "checkbox" });

  return (
    <Checkbox
      {...field}
      {...rest}
      errorText={meta.error && meta.touched ? meta.error : undefined}
    />
  );
};

export default FormikCheckbox;
