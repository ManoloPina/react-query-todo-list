import React from "react";
import { TextField, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
//Styles
import * as S from "./styles";

interface Props {}

const Registration: React.FC<Props> = ({}) => {
  const { handleSubmit, control } = useForm();
  return (
    <S.RegistrationContainer>
      <S.Title>Registration:</S.Title>
      <S.FormContainer>
        <form onSubmit={handleSubmit(() => {})}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="E-mail:"
                variant="standard"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="password"
                label="Password:"
              />
            )}
          />
          <Controller
            name="password-confirmation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="password"
                label="Password Confirmation:"
              />
            )}
          />
          <Button type="submit" size="large" fullWidth variant="contained">
            Register
          </Button>
        </form>
      </S.FormContainer>
    </S.RegistrationContainer>
  );
};
export { Registration };
