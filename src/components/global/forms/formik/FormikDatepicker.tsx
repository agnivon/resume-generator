import { useField } from "formik";
import CDatepicker, { CDatepickerProps } from "../CDatepicker";
import moment from "moment";

type FormikDatepickerProps = CDatepickerProps & {
  name: string;
  format?: string;
};

const FormikDatepicker = (props: FormikDatepickerProps) => {
  const { name, type, format, ...rest } = props;
  const [field, meta, helpers] = useField({ name, type });

  const momentValue = moment(field.value, format);

  return (
    <CDatepicker
      key={name}
      defaultDate={momentValue.isValid() ? momentValue.toDate() : undefined}
      {...field}
      {...rest}
      errorText={meta.error && meta.touched ? meta.error : undefined}
      onSelectedDateChanged={(date) => {
        const momentDate = moment(date);
        helpers.setValue(momentDate.isValid() ? momentDate.format(format) : "");
      }}
    />
  );
};

export default FormikDatepicker;
