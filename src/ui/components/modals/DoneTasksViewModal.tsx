import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { BaseModal } from "./BaseModal";
import { useAppContext } from "../../../core";
import { CenterRowBox, TaskItem } from "..";

interface IDoneTasksViewModalProps {}

const DoneTasksViewModal: React.FC<IDoneTasksViewModalProps> = React.memo(({}) => {
  const { showDoneTasksModal, closeDoneTaskModal, tasks } = useAppContext();

  return (
    <BaseModal show={showDoneTasksModal} onClose={closeDoneTaskModal}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className=" w-full flex flex-row justify-center items-center mb-7 sticky">
          <Typography variant="h3">Done Tasks</Typography>
        </div>
        <div>
          {tasks.map((item, i) => {
            if (item.isDone) return <TaskItem data={item} showActions={false} activeBodyClick={false} key={i + "d"} />;
          })}
        </div>
      </Box>
    </BaseModal>
  );
});

export { DoneTasksViewModal };
