import { upsertContact } from "@/endpoints/resume.endpoints";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import resumeSlice from "@/redux/slices/resumeSlice";
import { Contact } from "@/types/resume.types";
import {
  getSetQueryDataForEntities,
  getSetQueryDataForEntityByResumeId,
} from "@/utils/query.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpsertContact() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      resumeId,
      contact,
    }: {
      resumeId: string;
      contact: Contact;
    }) => upsertContact(resumeId, contact),
    onSuccess: (data, variables) => {
      dispatch(resumeSlice.actions.upsertOneContact(data));
      queryClient.setQueriesData(
        { queryKey: ["resumes"], exact: true },
        getSetQueryDataForEntities(data, variables, "contact")
      );
      queryClient.setQueriesData(
        { queryKey: ["resumes", variables.resumeId], exact: true },
        getSetQueryDataForEntityByResumeId(data, variables, "contact")
      );
      //queryClient.invalidateQueries({ queryKey: ["resumes"] });
      //queryClient.invalidateQueries({ queryKey: ["contacts"] });
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
