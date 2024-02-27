import { ResumeFormValues } from "@/types/form.types";
import {
  Bars3Icon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FormikProps } from "formik";
import _ from "lodash";
import React from "react";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import useDeleteResumeEntity from "../data/useDeleteResumeEntity";
import useUpsertResumeEntity from "../data/useUpsertResumeEntity";
import { produce } from "immer";
import { Tooltip } from "flowbite-react";
import { ResumeEntityArrayKeysV2 } from "@/types/resume.v2.types";

export default function useFormListManager<T extends { displayOrder: number }>(
  formik: FormikProps<ResumeFormValues>,
  entity: ResumeEntityArrayKeysV2,
  path: string,
  NEW_FUNC: (value: Partial<T>) => T
) {
  //const upsertEntity = useUpsertResumeEntity(path, entity);

  //const deleteEntity = useDeleteResumeEntity(path, entity);

  //const alert = useAlert();

  const [selectedItemIdx, setSelectedItemIdx] = React.useState<number | null>(
    0
  );

  const [changeIdx, setChangeIdx] = React.useState<number | null>(null);

  const [deleteIdx, setDeleteIdx] = React.useState<number | null>(null);

  const formErrors = formik.errors?.resume?.[entity];

  const formTouched = formik.touched?.resume?.[entity];

  const doEntitiesExist = formik.values.resume[entity].length > 0;

  const selectedEntity = _.isNumber(selectedItemIdx)
    ? (formik.values.resume[entity][selectedItemIdx] as unknown as T)
    : null;

  const selectedEntityName = `resume.${entity}.${selectedItemIdx}`;

  const isFormValid = !Boolean(formErrors);

  //const isMutationPending = upsertEntity.isPending || deleteEntity.isPending;

  const handleAddNewItem = () => {
    const existingItems = formik.values.resume[entity];
    formik.setFieldValue(`resume.${entity}`, [
      ...existingItems,
      NEW_FUNC({
        //resumeId: formik.values.resume.id,
        displayOrder: existingItems.length,
      } as Partial<T>),
    ]);
    setSelectedItemIdx(existingItems.length);
  };

  const handleDeleteItem = async () => {
    if (_.isNumber(deleteIdx)) {
      const existingItems = formik.values.resume[entity];
      formik.setFieldValue(
        `resume.${entity}`,
        existingItems
          .slice(0, deleteIdx)
          .concat(existingItems.slice(deleteIdx + 1, existingItems.length))
      );
      if (selectedItemIdx === deleteIdx) setSelectedItemIdx(null);
      setDeleteIdx(null);
      /* try {
        const e = formik.values.resume[entity][deleteIdx];
        if (e.id) {
          await deleteEntity.mutation.mutateAsync({
            resumeId: formik.values.resume.id,
            id: e.id,
          });
        }
        alert.success("Deleted");
      } catch (err) {
        alert.error("Something went wrong");
      } */
    }
  };

  const handleListItemClicked = (idx: number) => {
    //console.log(idx, selectedExpIdx);
    if (idx !== selectedItemIdx) {
      /* if (_.isNumber(selectedItemIdx)) {
        const savedItem = formik.initialValues.resume[entity][selectedItemIdx];
        const changedItem = formik.values.resume[entity][selectedItemIdx];
        if (!_.isEqual(savedItem, changedItem)) {
          setChangeIdx(idx);
        } else {
          setSelectedItemIdx(idx);
        }
      } else {
        setSelectedItemIdx(idx);
      } */
      setSelectedItemIdx(idx);
    }
  };

  const handleUnsavedListItemChange = () => {
    formik.resetForm();
    setSelectedItemIdx(changeIdx);
    setChangeIdx(null);
  };

  const getListItemContent = (content: React.ReactNode, idx: number) => {
    const entities = formik.values.resume[entity];
    const touchedAndError =
      formTouched?.[idx] && formErrors?.[idx] && formik.submitCount >= 1;
    const VisibleIcon = entities[idx].hidden ? EyeSlashIcon : EyeIcon;
    const onVisibilityChange = () =>
      formik.setFieldValue(
        `resume.${entity}`,
        produce(entities, (draft) => {
          draft[idx].hidden = !draft[idx].hidden;
        })
      );

    return (
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col text-left overflow-hidden">
            {content}
          </div>
          <div className="flex items-center gap-x-2 ml-1">
            <div className="shrink-0">
              <Tooltip content={entities[idx].hidden ? "Show" : "Hide"}>
                <VisibleIcon
                  className=" h-5 w-5 shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onVisibilityChange();
                  }}
                />
              </Tooltip>
            </div>
            <div className="shrink-0">
              <Tooltip content={"Delete"}>
                <TrashIcon
                  className="text-red-500 h-5 w-5 shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteIdx(idx);
                  }}
                />
              </Tooltip>
            </div>
          </div>
        </div>
        {touchedAndError && (
          <div className="shrink-0">
            <span className="inline-block h-2 w-2 bg-red-500 rounded-full"></span>{" "}
            <span className="text-red-500 text-sm">
              This section has errors
            </span>
          </div>
        )}
      </div>
    );
  };

  const getDraggableListItemContent = (content: React.ReactNode) => {
    return (
      <div className="flex justify-between w-full items-center">
        <div className="text-left line-clamp-3 overflow-hidden">{content}</div>
        <div className="ml-1 shrink-0">
          <Bars3Icon className="text-gray-500 dark:text-white h-5 w-5 shrink-0" />
        </div>
      </div>
    );
  };

  const handleSequenceChange = (
    result: DropResult,
    _provided: ResponderProvided
  ): void => {
    if (!result.destination) return;
    const items = _.cloneDeep([...formik.values.resume[entity]]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    items.forEach((item, idx) => {
      item.displayOrder = idx;
    });
    formik.setFieldValue(`resume.${entity}`, items);
    setSelectedItemIdx(result.destination.index);
  };

  /* const handleSaveForm = async () => {
    validateFormikForm(
      formik,
      async () => {
        try {
          const e = formik.values.resume[entity];
          await upsertEntity.mutation.mutateAsync({
            resumeId: formik.values.resume.id,
            entities: e,
          });
          alert.success("Changes saved");
        } catch (err) {
          alert.error("Something went wrong");
        }
      },
      () => {
        formik.setTouched(getFormikTouchedObject(formik.values));
        alert.error(FORM_INVALID_MESSAGE);
      }
    );
  }; */

  return {
    doEntitiesExist,
    selectedEntity,
    selectedEntityName,
    selectedItemIdx,
    setSelectedItemIdx,
    changeIdx,
    setChangeIdx,
    deleteIdx,
    setDeleteIdx,
    isFormValid,
    //isMutationPending,
    handleAddNewItem,
    handleDeleteItem,
    handleListItemClicked,
    handleUnsavedListItemChange,
    getListItemContent,
    handleSequenceChange,
    getDraggableListItemContent,
    //handleSaveForm,
  };
}
