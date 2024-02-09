import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { ValidationError } from "yup";

export function getErrorMessage(err: unknown) {
  if (err instanceof ValidationError) {
    return { status: 400, message: err.errors.join("\n") };
  }
  if (err instanceof PrismaClientValidationError) {
    return { status: 400, message: err.message };
  }
  if (err instanceof Error) {
    return { status: 500, message: err.message };
  }
  return { status: 500, message: "Internal Server Error" };
}
