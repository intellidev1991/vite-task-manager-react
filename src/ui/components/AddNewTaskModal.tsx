import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { BaseModal } from "./BaseModal";
import { ITaskItem, useAppContext, useObjectState } from "../../core";
import { useYupValidation } from "../../core/hooks/useYupValidation";
import * as yup from "yup";
import { BigOrangeButton, CenterRowBox, PrioritySelector } from ".";
import TextField from "@mui/material/TextField";
import { nanoid } from "nanoid";
interface IAddNewTaskModalProps {
  onSubmitted: () => void;
  data?: ITaskItem;
}

const AddNewTaskModal: React.FC<IAddNewTaskModalProps> = React.memo(({ onSubmitted, data }) => {
  const init_form: ITaskItem = {
    id: nanoid(),
    title: "",
    description: "",
    gift: "",
    priority: "Low",
    isDone: false,
  };

  //@ts-ignore
  const [state, setState] = useObjectState<ITaskItem>(init_form);
  const { clearErrors, hasError, showErrorMessage, validationSync } = useYupValidation();
  const { addNotify, addTask, editTask, showAddModal, closeAddTaskModal } = useAppContext();

  //Validation schema
  let schema = yup.object().shape({
    title: yup.string().required("Title field is required"),
    description: yup.string().required("Description field is required"),
    //gift: yup.string().required("This field is required"),
  });

  useEffect(() => {
    if (showAddModal) {
      if (data) {
        //edit mode
        console.log("edit", data);
        setState({ ...data });
      } else {
        //new
        setState({ ...init_form });
      }
    } else {
      clearForm();
    }
  }, [showAddModal]);

  const clearForm = () => {
    setState({ ...init_form });
    clearErrors();
  };

  const isFormValid = () => {
    return validationSync(schema, state);
  };

  const onSubmit = () => {
    if (!isFormValid()) return;
    //-------
    if (data) {
      //edit mode
      editTask({ ...state });
      addNotify({ id: nanoid(), title: `The Task '${state.title}' has been Edited.` });
    } else {
      //add mode
      addTask({ ...state });
      addNotify({ id: nanoid(), title: `New Task '${state.title}' has been added.` });
    }
    //---
    clearForm();
    onSubmitted();
  };

  return (
    <BaseModal show={showAddModal} onClose={closeAddTaskModal}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          error={hasError("title")}
          label="Title"
          helperText={showErrorMessage("title")}
          value={state.title}
          onChange={(e) => setState({ title: e.target.value })}
          fullWidth
        />
        <TextField
          error={hasError("description")}
          label="Description"
          helperText={showErrorMessage("description")}
          value={state.description}
          onChange={(e) => setState({ description: e.target.value })}
          multiline
          rows={10}
          fullWidth
        />
        <TextField
          error={hasError("gift")}
          label="Gift and KPI for this task :)"
          helperText={showErrorMessage("gift")}
          value={state.gift}
          onChange={(e) => setState({ gift: e.target.value })}
          fullWidth
        />
        <PrioritySelector className="py-7" value={state.priority} onChange={(priority) => setState({ priority })} />
      </Box>
      <CenterRowBox>
        <BigOrangeButton onClick={onSubmit}>{data ? "Edit The Task" : "Add To Tasks"}</BigOrangeButton>
      </CenterRowBox>
    </BaseModal>
  );
});

export { AddNewTaskModal };
