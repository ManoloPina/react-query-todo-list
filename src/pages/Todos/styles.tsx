import styled from "styled-components";
import { Container, Typography } from "@mui/material";

export const TodoContainer = styled(Container)`
  && {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 2rem;
  }
`;

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: "h3",
}))`
  && {
  }
`;
