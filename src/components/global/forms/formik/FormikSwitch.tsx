import { useField } from "formik";
import Switch, { SwitchProps } from "../Switch";

type FormikSwitchProps = SwitchProps & {
  name: string;
};

const FormikSwitch = (props: FormikSwitchProps) => {
  const { name, ...rest } = props;
  const [field, meta] = useField({ name });

  return (
    <Switch
      {...field}
      {...rest}
      errorText={meta.error && meta.touched ? meta.error : undefined}
    />
  );
};

export default FormikSwitch;
