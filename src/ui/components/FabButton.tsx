import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "../../core";

interface IFabButtonProps {
  className?: string;
}

const FabButton: React.FC<IFabButtonProps> = React.memo(({ className }) => {
  const { openAddTaskModal, setSelectedTask } = useAppContext();

  const _openAddTaskHandler = () => {
    setSelectedTask(undefined);
    openAddTaskModal();
  };
  return (
    <div className="fixed bottom-6 right-6">
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          style={{ backgroundColor: "#DD2C00", color: "#FFF" }}
          size="large"
          aria-label="add"
          onClick={_openAddTaskHandler}
        >
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
});

export { FabButton };
