import styled from "styled-components";
import { Box } from "@mui/material";
import { darkTheme } from "components/layout/theme";

export const AppContainer = styled(Box)`
  && {
    height: 100%;
    padding-top: 6rem;
    background-color: ${darkTheme.palette.secondary.light};
  }
`;
