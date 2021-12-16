import React, { useState } from "react";
import { useChangeTitle, useObjectState } from "../../core";
import { AddNewTaskModal, BigOrangeButton, CenterRowBox } from "../components";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = React.memo(({}) => {
  const meta = useChangeTitle("Home");
  const [state, setState] = useObjectState({
    showAddNewTaskModal: false,
  });

  const onCreateNewTaskButtonHandler = () => {
    setState({ showAddNewTaskModal: true });
  };
  const onAddNewTaskClosed = () => {
    setState({ showAddNewTaskModal: false });
  };
  const onAddNewTaskCreated = () => {
    setState({ showAddNewTaskModal: false });
  };

  return (
    <div className="w-full my-h-full">
      {meta}

      <div className="w-full h-full p-10 flex flex-col justify-between items-center">
        <Typography variant="h3">Hello World</Typography>
        <BigOrangeButton variant="contained" onClick={onCreateNewTaskButtonHandler}>
          Create Your First Task :)
        </BigOrangeButton>
        <div></div>
      </div>

      <AddNewTaskModal
        show={state.showAddNewTaskModal}
        onClose={onAddNewTaskClosed}
        onTaskCreated={onAddNewTaskCreated}
      />
    </div>
  );
});

export default Home;
