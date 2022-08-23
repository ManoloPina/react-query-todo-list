import styled from "styled-components";
import { Container, Typography, Box } from "@mui/material";
import { darkTheme } from "components/layout/theme";

export const LoginContainer = styled(Container).attrs((props) => ({
  ...props,
  maxWidth: "lg",
}))`
  && {
    display: grid;
    grid-row-gap: 2rem;
    grid-template-columns: 1fr;
  }
`;

export const FormContainer = styled(Box).attrs((props) => ({
  ...props,
}))`
  && {
    form {
      display: grid;
      padding: 2rem;
      grid-row-gap: 2rem;
    }
    border: ${darkTheme.palette.secondary.dark} solid 1px;
    border-radius: 0.6rem;
    background-color: ${darkTheme.palette.secondary.main};
  }
`;

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: "h2",
}))``;

export const ActionsWrapper = styled(Box)`
  && {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    & button:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;
