import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
//Styles
import * as S from "./styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { darkTheme } from "components/layout/theme";
//Components
import { Login } from "pages/Login";
import { Header } from "components/layout/Header";
//Types
import { ROUTES } from "constants";

interface Props {}

const queryClient = new QueryClient();

const App: React.FC<Props> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <S.AppContainer>
            <Header />
            <Routes>
              <Route path="/*" element={<Outlet />}>
                {/* Public Paths */}
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
              </Route>
            </Routes>
          </S.AppContainer>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export { App };
