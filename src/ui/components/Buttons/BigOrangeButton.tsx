import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const BigOrangeButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#000",
  backgroundColor: theme.palette.warning.light,
  "&:hover": {
    backgroundColor: theme.palette.warning.light,
  },
  border: "2px solid #000",
  padding: "15px 20px",
  borderRadius: "10px",
  width: "300px",
  fontSize: "20px",
  textTransform: "none",
}));
