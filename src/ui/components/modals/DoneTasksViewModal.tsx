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
      <Box component="form" style={{ height: "75vh" }} noValidate autoComplete="off">
        <div className="flex flex-col justify-start h-full">
          <div className="w-full flex flex-row justify-center items-center mb-7">
            <Typography variant="h3">Done Tasks</Typography>
          </div>
          <div className="max-h-full overflow-y-scroll flex-1 px-6">
            {tasks.map((item, i) => {
              if (item.isDone)
                return <TaskItem data={item} showActions={false} activeBodyClick={false} key={i + "d"} />;
            })}
          </div>
        </div>
      </Box>
    </BaseModal>
  );
});

export { DoneTasksViewModal };
