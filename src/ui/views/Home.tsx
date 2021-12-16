import React, { useEffect, useState } from "react";
import { ITaskItem, useAppContext, useChangeTitle } from "../../core";
import { AddNewTaskModal, FabButton, TaskItem, TopBar, WelcomeView } from "../components";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = React.memo(({}) => {
  const meta = useChangeTitle("Home");
  const { tasks, selectedTask, setSelectedTask, showAddModal, openAddTaskModal, closeAddTaskModal } = useAppContext();

  useEffect(() => {
    if (!showAddModal) setSelectedTask(undefined);
  }, [showAddModal]);

  const onTaskAddOrEditSubmittedHandler = () => closeAddTaskModal();
  const onViewDoneTaskClickHandler = () => {};

  return (
    <div className="w-full my-h-full overflow-y-auto pt-4 px-4 md:px-12">
      {meta}

      {tasks.length === 0 && <WelcomeView />}

      {tasks.length !== 0 && (
        <div className="">
          <TopBar onDoneTaskClick={onViewDoneTaskClickHandler} />

          {tasks.map((item, i) => {
            if (!item.isDone) return <TaskItem data={item} key={i} />;
          })}
          <FabButton />
        </div>
      )}

      <AddNewTaskModal onSubmitted={onTaskAddOrEditSubmittedHandler} data={selectedTask} />
    </div>
  );
});

export default Home;
