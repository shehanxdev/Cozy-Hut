import FlexBetween from "componenets/FlexBetween";
import React from "react";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  //COLOR CONSTANTS
  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          CozyHut
        </Typography>
      </FlexBetween>
    </FlexBetween>
  );
}
//temp

export default NavBar;
