import styled from "styled-components";
import { Box, Container, Typography, Toolbar as _Toolbar } from "@mui/material";
import { darkTheme } from "components/layout/theme";

export const HeaderContainer = styled(Container)``;

export const Title = styled(Typography)`
  && {
    padding-left: 0.5rem;
    font-weight: bold;
    color: ${darkTheme.palette.secondary.light};
  }
`;

export const MenuListWrapper = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    button {
      color: white;
    }
  }
`;

export const Toolbar = styled(_Toolbar)`
  && {
    justify-content: space-between;
  }
`;

export const LogoWrapper = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 3.2rem;
      height: auto;
    }
  }
`;
