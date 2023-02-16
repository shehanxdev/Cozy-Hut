import FlexBetween from "componenets/FlexBetween";
import React from "react";
import {
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
function NavBar() {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  //COLOR CONSTANTS
  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const neutralLight = theme.palette.neutral.light;
  const alt = theme.palette.background.alt;
  console.log(isNonMobileScreens);
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
          {}
          CozyHut
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
    </FlexBetween>
  );
}
//temp

export default NavBar;
