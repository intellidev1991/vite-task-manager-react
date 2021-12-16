import { Typography } from "@mui/material";
import React from "react";
import { NormalButton } from ".";

interface ITopBarProps {
  className?: string;
  onDoneTaskClick: () => void;
}

const TopBar: React.FC<ITopBarProps> = React.memo(({ className, onDoneTaskClick }) => {
  return (
    <div className={`grid grid-rows-1 grid-cols-3 justify-items-stretch mb-6 ${className}`}>
      <NormalButton variant="contained" color="info" className="justify-self-start" onClick={onDoneTaskClick}>
        View Done Tasks
      </NormalButton>

      <Typography variant="h3" className="justify-self-center">
        Hello World
      </Typography>
      <div></div>
    </div>
  );
});

export { TopBar };
