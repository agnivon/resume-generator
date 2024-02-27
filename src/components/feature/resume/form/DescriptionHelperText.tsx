import FormikCharactersRemaining from "@/components/global/forms/formik/FormikCharactersRemaining";
import { DESCRIPTION_LENGTH } from "@/constants/schema.constants";

export default function DescriptionHelperText({
  text,
  name,
  limit = DESCRIPTION_LENGTH,
}: {
  text: string;
  name: string;
  limit?: number;
}) {
  return (
    <div className="flex justify-between">
      <span>{text}</span>
      <span>
        <FormikCharactersRemaining name={name} limit={limit} />
      </span>
    </div>
  );
}
