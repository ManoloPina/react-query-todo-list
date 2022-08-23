import React from "react";
import { useAuth } from "hooks";
import { useForm, Controller } from "react-hook-form";
//Styles
import * as S from "./styles";
//Components
import { Button, TextField } from "@mui/material";
import { LoginRounded, PersonAddAltRounded } from "@mui/icons-material";

interface Props {}

interface IForm {
  email: string;
  password: string;
}

const Login: React.FC<Props> = ({}) => {
  const {
    login,
    handlers: { handleRegistrationBtnClick },
  } = useAuth();
  const { control, handleSubmit } = useForm<IForm>();
  const onSubmit = (values: IForm) => login(values);
  return (
    <S.LoginContainer>
      <S.Title>Login</S.Title>
      <S.FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <S.ActionsWrapper>
            <Button
              type="submit"
              size="large"
              variant="contained"
              startIcon={<LoginRounded />}
            >
              Login
            </Button>
            <Button
              size="large"
              variant="outlined"
              startIcon={<PersonAddAltRounded />}
              onClick={handleRegistrationBtnClick}
            >
              Register
            </Button>
          </S.ActionsWrapper>
        </form>
      </S.FormContainer>
    </S.LoginContainer>
  );
};

export { Login };
