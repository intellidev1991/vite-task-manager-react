import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import { Box } from "@mui/system";
import { BaseModal } from "./BaseModal";
import { ITaskItem, useAppContext, useObjectState } from "../../../core";
import { useYupValidation } from "../../../core/hooks/useYupValidation";
import { BigOrangeButton, CenterRowBox, PrioritySelector } from "..";
import TextField from "@mui/material/TextField";
import * as yup from "yup";

interface IAddNewTaskModalProps {}

const AddNewTaskModal: React.FC<IAddNewTaskModalProps> = React.memo(({}) => {
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
  const { addTask, addNotify, editTask, showAddModal, closeAddTaskModal, selectedTask, setSelectedTask } =
    useAppContext();

  //Validation schema
  let schema = yup.object().shape({
    title: yup.string().required("Title field is required"),
    description: yup.string().required("Description field is required"),
    //gift: yup.string().required("This field is required"),
  });

  useEffect(() => {
    if (showAddModal) {
      if (selectedTask) {
        //edit mode
        console.log("edit", selectedTask);
        setState({ ...selectedTask });
      } else {
        //new
        setState({ ...init_form });
      }
    } else {
      clearForm();
    }
  }, [showAddModal]);

  useEffect(() => {
    if (state.title || state.description) isFormValid();
  }, [state.description, state.title]);

  const isFormValid = () => {
    return validationSync(schema, state);
  };

  const _onSubmit = () => {
    if (!isFormValid()) return;
    //-------
    if (selectedTask) {
      //edit mode
      editTask({ ...state });
      addNotify(`The task '${state.title}' has been edited.`);
    } else {
      //add mode
      addTask({ ...state });
      addNotify(`New task '${state.title}' has been added.`);
    }
    //---
    _onCloseHandler();
  };

  const _onCloseHandler = () => {
    clearForm();
  };

  const clearForm = () => {
    setState({ ...init_form });
    clearErrors();
    closeAddTaskModal();
    setSelectedTask(undefined);
  };

  return (
    <BaseModal show={showAddModal} onClose={_onCloseHandler}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        style={{ height: "75vh" }}
        noValidate
        autoComplete="off"
      >
        <div className="flex flex-col justify-start h-full">
          <div className="flex-1">
            <TextField
              sx={styles.inputBox}
              error={hasError("title")}
              label="Title"
              helperText={showErrorMessage("title")}
              value={state.title}
              onChange={(e) => setState({ title: e.target.value })}
              fullWidth
            />
            <TextField
              sx={styles.inputBox}
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
              sx={styles.inputBox}
              error={hasError("gift")}
              label="Gift and KPI for this task :)"
              helperText={showErrorMessage("gift")}
              value={state.gift}
              onChange={(e) => setState({ gift: e.target.value })}
              fullWidth
            />
            <PrioritySelector className="py-7" value={state.priority} onChange={(priority) => setState({ priority })} />
          </div>
          <CenterRowBox>
            <BigOrangeButton onClick={_onSubmit}>{selectedTask ? "Edit The Task" : "Add To Tasks"}</BigOrangeButton>
          </CenterRowBox>
        </div>
      </Box>
    </BaseModal>
  );
});

export { AddNewTaskModal };

const styles = {
  inputBox: {
    "& .MuiFormHelperText-root": { backgroundColor: "#E5E7EB" },
    "& .MuiFormControl-root": { backgroundColor: "#E5E7EB" },
    "& .MuiOutlinedInput-input": { backgroundColor: "#FFF" },
    "& .MuiOutlinedInput-root": { backgroundColor: "#FFF" },
  },
};
