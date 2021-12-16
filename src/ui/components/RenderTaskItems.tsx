import React from "react";
import { TaskItem } from ".";
import { useAppContext } from "../../core";

interface IRenderTaskItemsProps {}

const RenderTaskItems: React.FC<IRenderTaskItemsProps> = React.memo(({}) => {
  const { tasks } = useAppContext();

  return (
    <>
      {tasks.map((item, i) => {
        if (!item.isDone) return <TaskItem data={item} key={i} activeBodyClick />;
      })}
    </>
  );
});

export { RenderTaskItems };
