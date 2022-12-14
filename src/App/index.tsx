import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "utils/queryClient";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
//Styles
import * as S from "./styles";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "components/layout/theme";
//Components
import { Login } from "pages/Login";
import { Header } from "components/layout/Header";
import { Required } from "routes/Required";
import { Spinner } from "components/layout/Spinner";
import { Todos } from "pages/Todos";
import { Profile } from "pages/Profile";
import { Toaster } from "react-hot-toast";
import { Registration } from "pages/Registration";
//Types
import { ROUTES } from "constants";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <SnackbarProvider maxSnack={5}>
            <S.AppContainer>
              <Header />
              <Routes>
                <Route path="/*" element={<Outlet />}>
                  {/* Public Paths */}
                  <Route index element={<Login />} />
                  <Route
                    path={ROUTES.REGISTRATION}
                    element={<Registration />}
                  />
                  <Route element={<Required />}>
                    <Route path={ROUTES.TODOS} element={<Todos />} />
                    <Route path={ROUTES.PROFILE} element={<Profile />} />
                  </Route>
                  <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
                </Route>
              </Routes>
            </S.AppContainer>
          </SnackbarProvider>

          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
      <Spinner />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export { App };
