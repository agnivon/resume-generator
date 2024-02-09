import { AxiosError } from "axios";
import { FormikErrors, FormikProps, FormikTouched, FormikValues } from "formik";

export const formikLogger = <T>(
  formik: FormikProps<T>,
  name: string = "Random Form"
) => {
  if (process.env.NODE_ENV === "development")
    console.log(
      name,
      " - ",
      "Formik Values:",
      formik.values,
      "Formik Errors:",
      formik.errors,
      "Formik Touched:",
      formik.touched
    );
};

export const getFormikTouchedObject = <
  T extends { [s: string]: unknown } | ArrayLike<unknown>
>(
  values: T,
  touched = true
): FormikTouched<T> => {
  return Object.fromEntries(
    Object.entries(values).map((entry) => {
      if (entry[1]) {
        if (Array.isArray(entry[1]))
          return [
            entry[0],
            entry[1].map((object) =>
              object ? getFormikTouchedObject(object, touched) : touched
            ),
          ];
        else if (entry[1] instanceof Date) return [entry[0], touched];
        else if (typeof entry[1] == "object")
          return [entry[0], getFormikTouchedObject(entry[1] as T, touched)];
      }
      return [entry[0], touched];
    })
  );
};

export const validateFormikForm = <T>(
  formik: FormikProps<T>,
  onSuccess: () => void,
  onFailure: (errors: FormikErrors<T>) => void
) => {
  formik
    .validateForm()
    .then((errors) => {
      if (Object.values(errors).length) {
        onFailure(errors);
      } else {
        onSuccess();
      }
    })
    .catch((e) => console.log(e));
};

export const getTextAreaRows = (content: string = "", min: number = 5) => {
  const count = (content.match(/\n/g) || []).length;
  return Math.max(min, count);
};

export const getToastErrMessage = (err: unknown) => {
  if (err instanceof AxiosError) {
    return err.response?.data || err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "Something went wrong";
};
