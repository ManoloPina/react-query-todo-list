import styled from "styled-components";
import { Container, Typography, Box } from "@mui/material";
import { darkTheme } from "components/layout/theme";

export const RegistrationContainer = styled(Container)`
  && {
    && {
      display: grid;
      grid-row-gap: 2rem;
      grid-template-columns: 1fr;
    }
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
    border-radius: 0.6rem;
    border: ${darkTheme.palette.secondary.dark} solid 1px;
    background-color: ${darkTheme.palette.secondary.main};
  }
`;

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: "h2",
}))``;
