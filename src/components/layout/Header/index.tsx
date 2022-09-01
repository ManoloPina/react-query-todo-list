import React, { ReactNode } from "react";
import { useUser, useAuth } from "hooks";
import { NavLink } from "react-router-dom";
//Styles
import * as S from "./styles";
import Logo from "assets/react-query-logo.svg";
//Components
import { AppBar, Button, Container } from "@mui/material";
import {
  PowerSettingsNewRounded,
  FactCheckRounded,
  PersonRounded,
} from "@mui/icons-material";
//Types
import { ROUTES } from "constants";

interface Props {}

interface INavigationItem {
  name: string;
  path: string;
  authenticated: boolean;
  icon?: ReactNode;
}

const navigation: INavigationItem[] = [
  {
    name: "Todos",
    path: ROUTES.TODOS,
    authenticated: true,
    icon: <FactCheckRounded />,
  },
  {
    name: "Profile",
    path: ROUTES.PROFILE,
    authenticated: true,
    icon: <PersonRounded />,
  },
  {
    name: "Logout",
    path: ROUTES.LOGOUT,
    authenticated: true,
    icon: <PowerSettingsNewRounded />,
  },
];

const Header: React.FC<Props> = () => {
  const {
    handlers: { handleLogout },
  } = useAuth();
  const { user } = useUser();
  return (
    <S.HeaderContainer>
      <AppBar position="absolute">
        <Container disableGutters>
          <S.Toolbar>
            <S.LogoWrapper>
              <img src={Logo} />
              <S.Title variant="h5">React Query</S.Title>
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
                        <Button
                          key={item.name}
                          onClick={handleLogout}
                          startIcon={item?.icon ?? undefined}
                        >
                          {item.name}
                        </Button>
                      );
                    default:
                      return (
                        <NavLink key={item.name} to={item.path}>
                          <Button startIcon={item?.icon ?? undefined}>
                            {item.name}
                          </Button>
                        </NavLink>
                      );
                  }
                })}
            </S.MenuListWrapper>
          </S.Toolbar>
        </Container>
      </AppBar>
    </S.HeaderContainer>
  );
};

export { Header };
