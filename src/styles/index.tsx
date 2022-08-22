import styled from "styled-components";
import { Box } from "@mui/material";

interface IActionsWrapper {
  marginSpace: string;
  fullWidth?: boolean;
}

export const ActionsWrapper = styled(Box)<IActionsWrapper>`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: ${({ fullWidth }) => (!!fullWidth ? `100%` : `max-content`)};
    & button:not(:first-child) {
      margin-left: ${(props) => props.marginSpace && `${props.marginSpace}`};
    }
  }
`;
