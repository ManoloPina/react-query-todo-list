import React from "react";
import { useUser, useAuth } from "hooks";
import { NavLink } from "react-router-dom";
//Styles
import * as S from "./styles";
import Logo from "assets/react-query-logo.svg";
//Components
import { AppBar, Toolbar, Button } from "@mui/material";
//Types
import { ROUTES } from "constants";

interface Props {}

interface INavigationItem {
  name: string;
  path: string;
  authenticated: boolean;
}

const navigation: INavigationItem[] = [
  { name: "Login", authenticated: false, path: ROUTES.LOGIN },
  { name: "Todos", path: ROUTES.TODOS, authenticated: true },
  { name: "Registration", path: ROUTES.TODOS, authenticated: false },
  { name: "Logout", path: ROUTES.LOGOUT, authenticated: true },
];

const Header: React.FC<Props> = () => {
  const {
    handlers: { handleLogout },
  } = useAuth();
  const { user } = useUser();
  return (
    <S.HeaderContainer>
      <AppBar position="absolute">
        <Toolbar>
          <S.LogoWrapper>
            <img src={Logo} />
          </S.LogoWrapper>
          <S.MenuListWrapper>
            {navigation
              .filter((item) =>
                !!user ? !!item.authenticated : !item.authenticated
              )
              .map((item) => {
                switch (item.path) {
                  case ROUTES.LOGOUT:
                    return (
                      <Button key={item.name} onClick={handleLogout}>
                        {item.name}
                      </Button>
                    );
                  default:
                    return (
                      <NavLink key={item.name} to={item.path}>
                        <Button>{item.name}</Button>
                      </NavLink>
                    );
                }
              })}
          </S.MenuListWrapper>
        </Toolbar>
      </AppBar>
    </S.HeaderContainer>
  );
};

export { Header };
