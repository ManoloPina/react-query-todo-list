import React from "react";
import { useAuth } from "hooks";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//Styles
import * as S from "./styles";
import * as Styles from "styles";
//Components
import { TextField, Button } from "@mui/material";
import {
  PersonAddAltRounded,
  KeyboardReturnRounded,
} from "@mui/icons-material";
//Types
import { IRegisterReq } from "types/Auth";

interface Props {}

interface IForm extends IRegisterReq {
  passwordCheck: string;
}

const formSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(8).required(),
  passwordCheck: yup
    .string()
    .min(6)
    .max(8)
    .oneOf([yup.ref("password"), null], "Password must match")
    .required(),
});

const Registration: React.FC<Props> = ({}) => {
  const {
    handlers: { navigateToLogin, handleUserRegistrationSubmit },
  } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(formSchema),
  });
  return (
    <S.RegistrationContainer>
      <S.Title>Registration:</S.Title>
      <S.FormContainer>
        <form onSubmit={handleSubmit(handleUserRegistrationSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Nome:"
                variant="standard"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="E-mail:"
                variant="standard"
                error={!!errors.email}
                helperText={errors.email?.message}
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
                variant="standard"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Controller
            name="passwordCheck"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="password"
                label="Password Confirmation:"
                error={!!errors.passwordCheck}
                helperText={errors.passwordCheck?.message}
              />
            )}
          />
          <Styles.ActionsWrapper fullWidth marginSpace="1rem">
            <Button
              size="large"
              variant="outlined"
              onClick={navigateToLogin}
              startIcon={<KeyboardReturnRounded />}
            >
              Already Registered?
            </Button>
            <Button
              type="submit"
              size="large"
              variant="contained"
              startIcon={<PersonAddAltRounded />}
            >
              Register
            </Button>
          </Styles.ActionsWrapper>
        </form>
      </S.FormContainer>
    </S.RegistrationContainer>
  );
};
export { Registration };
