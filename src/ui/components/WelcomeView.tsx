import React from "react";
import { Typography } from "@mui/material";
import { BigOrangeButton, NormalButton } from ".";
import { useAppContext } from "../../core";

interface IWelcomeViewProps {
  className?: string;
}

const WelcomeView: React.FC<IWelcomeViewProps> = React.memo(({ className }) => {
  const { openAddTaskModal } = useAppContext();

  return (
    <div className="w-full h-full p-10 flex flex-col justify-between items-center">
      <Typography variant="h3">Hello World</Typography>
      <BigOrangeButton variant="contained" onClick={openAddTaskModal}>
        Create Your First Task :)
      </BigOrangeButton>
      <div></div>
    </div>
  );
});

export { WelcomeView };
