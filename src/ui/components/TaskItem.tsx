import { Typography } from "@mui/material";
import React from "react";
import { CircleIndicator, NormalButton } from ".";
import { ITaskItem, useAppContext } from "../../core";

interface ITaskItemProps {
  data: ITaskItem;
  className?: string;
}

const TaskItem: React.FC<ITaskItemProps> = React.memo(({ className, data }) => {
  const { editTask, setSelectedTask, openAddTaskModal } = useAppContext();

  const itemClickHandler = () => {};
  const doneTaskHandler = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    editTask({ ...data, isDone: true });
  };

  const editTaskHandler = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTask(data);
    openAddTaskModal();
  };

  return (
    <div
      onClick={itemClickHandler}
      className={`bg-white w-full flex flex-row justify-between items-center border border-black rounded-xl px-5 py-4 shadow-md mb-4 hover:cursor-pointer hover:bg-gray-200 ${className}`}
    >
      <div className="flex flex-col justify-start items-start">
        <Typography variant="h4">{data.title}</Typography>
        <Typography variant="body1" color={(e) => e.palette.grey[500]} className="to-gray-400 mt-4">
          {data.description}
        </Typography>
      </div>
      <div className="flex flex-col justify-start items-end">
        <CircleIndicator priority={data.priority} active showLabel="before" onClick={() => {}} />
        <div className="flex flex-row justify-start items-center gap-3 mt-4">
          <NormalButton variant="contained" color="warning" onClick={doneTaskHandler}>
            Done Task
          </NormalButton>
          <NormalButton variant="contained" color={"success"} onClick={editTaskHandler}>
            Edit Task
          </NormalButton>
        </div>
      </div>
    </div>
  );
});

export { TaskItem };
