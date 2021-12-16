import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const NormalButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#FFF",
  border: "1px solid #000",
  borderRadius: "10px",
  fontSize: "16px",
  textTransform: "none",
}));
