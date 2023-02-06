import FlexBetween from "componenets/FlexBetween";
import React from "react";
import { useTheme } from "@mui/material";
function NavBar() {
  //COLOR CONSTANTS
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem"></FlexBetween>
    </FlexBetween>
  );
}

export default NavBar;
