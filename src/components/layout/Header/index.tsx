import React from "react";
//Styles
import * as S from "./styles";
import Logo from "assets/react-query-logo.svg";
//Components
import { AppBar, Toolbar, Button } from "@mui/material";

interface Props {}

const pages = ["login", "Todos", "Registration"];

const Header: React.FC<Props> = () => {
  return (
    <S.HeaderContainer>
      <AppBar position="absolute">
        <Toolbar>
          <S.LogoWrapper>
            <img src={Logo} />
          </S.LogoWrapper>
          <S.MenuListWrapper>
            {pages.map((page) => (
              <Button key={page}>{page}</Button>
            ))}
          </S.MenuListWrapper>
        </Toolbar>
      </AppBar>
    </S.HeaderContainer>
  );
};

export { Header };
