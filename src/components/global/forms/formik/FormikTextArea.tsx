import { useField } from "formik";
import Textarea, { TextareaProps } from "../Textarea";

type FormikTextAreaProps = TextareaProps & {
  name: string;
};

const FormikTextArea = (props: FormikTextAreaProps) => {
  const { name, ...rest } = props;
  const [field, meta] = useField({ name });

  return (
    <Textarea
      {...field}
      {...rest}
      errorText={meta.error && meta.touched ? meta.error : undefined}
    />
  );
};

export default FormikTextArea;
