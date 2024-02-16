import {
    createResumeTag
} from "@/endpoints/resume.endpoints";
import resumeSlice from "@/redux/slices/resumeSlice";
import {
    getSetQueryDataForInsertOrUpdateInArray
} from "@/utils/query.utils";
import { ResumeTagSchema } from "@/validation/schema/payload/resume.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferType } from "yup";
import { useAppDispatch } from "../../redux/useAppDispatch";

export default function useCreateResumeTag() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (tag: InferType<typeof ResumeTagSchema>) =>
      createResumeTag(tag),
    onSuccess: (data) => {
      dispatch(resumeSlice.actions.upsertOneResumeTag(data));
      queryClient.setQueriesData(
        { queryKey: ["resume-tags"], exact: true },
        getSetQueryDataForInsertOrUpdateInArray(data)
      );
      //queryClient.invalidateQueries({ queryKey: ["resumes"], exact: true });
    },
  });

  const { data, isPending, isError, isSuccess, status } = mutation;

  return {
    mutation,
    data,
    isPending,
    isError,
    isSuccess,
    status,
  };
}
