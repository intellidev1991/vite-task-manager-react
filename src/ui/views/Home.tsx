import React from "react";
import { useAppContext, useChangeTitle } from "../../core";
import {
  AddNewTaskModal,
  DoneTasksViewModal,
  FabButton,
  RenderTaskItems,
  TaskViewModal,
  TopBar,
  WelcomeView,
} from "../components";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = React.memo(({}) => {
  const meta = useChangeTitle("Home");
  const { tasks } = useAppContext();

  return (
    <div className="w-full my-h-full overflow-y-auto pt-4 px-4 md:px-12">
      {meta}
      {tasks.length === 0 && <WelcomeView />}
      {tasks.length !== 0 && (
        <>
          <TopBar />
          <RenderTaskItems />
          <FabButton />
        </>
      )}

      <AddNewTaskModal />
      <DoneTasksViewModal />
      <TaskViewModal />
    </div>
  );
});

export default Home;
