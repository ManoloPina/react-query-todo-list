import styled from "styled-components";
import { Box } from "@mui/material";

export const HeaderContainer = styled(Box)``;

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

export const LogoWrapper = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 3.2rem;
      height: auto;
      padding: 0.5rem;
    }
  }
`;
