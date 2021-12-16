import React from "react";
import { styled } from "@mui/system";
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
  height: "calc(80%)",
  border: "2px solid #000",
  borderRadius: "50px",
};

interface IBaseModalProps {
  show: boolean;
  onClose: () => void;
}

const BaseModal: React.FC<IBaseModalProps> = React.memo(({ show, onClose, children }) => {
  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={show}
        onClose={onClose}
        BackdropComponent={Backdrop}
      >
        <div style={style} className="bg-gray-200 p-5 my-hide-scroll-but-keep-working overflow-x-hidden">
          {children}
        </div>
      </StyledModal>
    </div>
  );
});

export { BaseModal };
