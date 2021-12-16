import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: "90%",
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "50px",
  p: 5,
  px: 4,
  pb: 3,
};

interface IAddNewTaskModalProps {
  show: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

const AddNewTaskModal: React.FC<IAddNewTaskModalProps> = React.memo(({ show, onClose, onTaskCreated }) => {
  useEffect(() => {}, []);

  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={show}
        onClose={onClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">Text in a modal</h2>
          <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p>
        </Box>
      </StyledModal>
    </div>
  );
});

export { AddNewTaskModal };
