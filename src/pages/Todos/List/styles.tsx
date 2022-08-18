import styled from "styled-components";
import { Box } from "@mui/material";

export const ListWrapper = styled(Box)`
  && {
    display: flex;
    width: 100%;
    flex-direction: column;
    & > div:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

export const ActionWrapper = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
