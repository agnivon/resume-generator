import { ResumeV2 } from "@prisma/client";
import { TypeKeys } from "./utility.types";

export type ResumeEntityArrayV2 = Exclude<
  ResumeV2[TypeKeys<ResumeV2, any[]>],
  "tags"
>;

export type ResumeEntityArrayKeysV2 = Exclude<TypeKeys<ResumeV2, any[]>, "tags">;
