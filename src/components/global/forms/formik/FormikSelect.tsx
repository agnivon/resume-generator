import { useField } from "formik";
import Select, { SelectProps } from "../Select";

type FormikSelectProps = SelectProps & {
  name: string;
};

const FormikSelect = (props: FormikSelectProps) => {
  const { name, ...rest } = props;
  const [field, meta] = useField({ name });

  return (
    <Select
      {...field}
      {...rest}
      errorText={meta.error && meta.touched ? meta.error : undefined}
    />
  );
};

export default FormikSelect;
