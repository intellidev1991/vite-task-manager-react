import React from "react";
import { Typography } from "@mui/material";
import { NormalButton } from ".";
import { useAppContext } from "../../core";

interface ITopBarProps {
  className?: string;
}

const TopBar: React.FC<ITopBarProps> = React.memo(({ className }) => {
  const { openDoneTaskModal } = useAppContext();

  return (
    <div className={`grid grid-rows-1 grid-cols-1 md:grid-cols-3 justify-items-stretch mb-6 gap-3 ${className}`}>
      <NormalButton variant="contained" color="info" className="justify-self-start" onClick={openDoneTaskModal}>
        View Done Tasks
      </NormalButton>

      <Typography variant="h3" className="justify-self-center">
        Hello World
      </Typography>
      <div className="hidden md:block"></div>
    </div>
  );
});

export { TopBar };
