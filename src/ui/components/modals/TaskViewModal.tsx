import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { BaseModal } from "./BaseModal";
import { useAppContext } from "../../../core";
import { CircleIndicator, NormalButton } from "..";

interface ITaskViewModalProps {}

const TaskViewModal: React.FC<ITaskViewModalProps> = React.memo(({}) => {
  const { addNotify, showTaskViewModal, closeTaskViewModal, openAddTaskModal, editTask, deleteTask, selectedTask } =
    useAppContext();

  const editTaskHandler = () => {
    closeTaskViewModal();
    openAddTaskModal();
  };
  const doneTaskHandler = () => {
    if (selectedTask) {
      editTask({ ...selectedTask, isDone: true });
      addNotify(`The task '${selectedTask.title}' has been done.`);
      closeTaskViewModal();
    }
  };
  const deleteTaskHandler = () => {
    if (selectedTask) {
      deleteTask({ ...selectedTask });
      addNotify(`The task '${selectedTask.title}' has been deleted.`);
      closeTaskViewModal();
    }
  };

  return (
    <BaseModal show={showTaskViewModal} onClose={closeTaskViewModal}>
      <Box component="form" style={{ height: "75vh" }} noValidate autoComplete="off">
        {selectedTask && (
          <div className="flex flex-col justify-start h-full">
            <div className={"grid grid-rows-1 grid-cols-1 md:grid-cols-3 justify-items-stretch mb-6"}>
              <CircleIndicator
                priority={selectedTask.priority}
                active
                showLabel="after"
                onClick={() => {}}
                className="justify-self-start"
              />
              <Typography variant="h3" className="justify-self-center break-all">
                {selectedTask.title}
              </Typography>
              <div></div>
            </div>
            <p className="px-4 md:px-32 mt-10 text-justify font-normal flex-1">{selectedTask.description}</p>
            <div className="flex flex-col md:flex-row justify-around items-center gap-2 mt-4">
              <NormalButton variant="contained" color={"warning"} className="w-40" onClick={editTaskHandler}>
                Edit Task
              </NormalButton>
              <NormalButton variant="contained" color="success" className="w-40" onClick={doneTaskHandler}>
                Done Task
              </NormalButton>
              <NormalButton variant="contained" color="error" className="w-40" onClick={deleteTaskHandler}>
                Delete Task
              </NormalButton>
            </div>
          </div>
        )}
      </Box>
    </BaseModal>
  );
});

export { TaskViewModal };
