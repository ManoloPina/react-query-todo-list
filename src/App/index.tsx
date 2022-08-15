import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//Styles
import * as S from "./styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { darkTheme } from "components/layout/theme";
//Components
import { Login } from "pages/Login";
import { Header } from "components/layout/Header";
import { Required } from "routes/Required";
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
                <Route element={<Required />}>
                  <Route path={ROUTES.TODOS} element={<h1>Todo</h1>} />
                </Route>
                <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
              </Route>
            </Routes>
          </S.AppContainer>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export { App };
