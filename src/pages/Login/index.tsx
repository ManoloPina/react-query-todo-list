import React from "react";
import { useForm, Controller } from "react-hook-form";
//Styles
import * as S from "./styles";
//Components
import { Button, TextField } from "@mui/material";

interface Props {}

interface IForm {
  email: string;
  password: string;
}

const Login: React.FC<Props> = ({}) => {
  const { control, handleSubmit } = useForm<IForm>();
  return (
    <S.LoginContainer>
      <S.Title>Login</S.Title>
      <S.FormContainer>
        <form>
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
          <Button type="submit" size="large" fullWidth variant="contained">
            Login
          </Button>
        </form>
      </S.FormContainer>
    </S.LoginContainer>
  );
};

export { Login };
