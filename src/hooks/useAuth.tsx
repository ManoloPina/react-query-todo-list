import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLogin, fetchLogout, registerUser } from "api/auth";
import { useNavigate } from "react-router-dom";
import { useHttp } from "hooks";
import { useSnackbar } from "notistack";
//Types
import { QUERY_KEYS, SESSION_KEYS, ROUTES } from "constants";
import { IAuth, IRegisterReq, IUser } from "types/Auth";

export const useAuth = () => {
  const {
    handlers: { handleError },
  } = useHttp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const token = sessionStorage.getItem(SESSION_KEYS.TOKEN);
  const storedUser = !!sessionStorage.getItem(SESSION_KEYS.USER)
    ? JSON.parse(sessionStorage.getItem(SESSION_KEYS.USER) as string)
    : null;

  const storeToken = (token: string) => {
    sessionStorage.setItem(SESSION_KEYS.TOKEN, token);
  };

  const storeUser = (user: IUser) => {
    sessionStorage.setItem(SESSION_KEYS.USER, JSON.stringify(user));
  };

  const { mutate: logout } = useMutation(fetchLogout, {
    onSuccess: () => {
      sessionStorage.removeItem(SESSION_KEYS.USER);
      sessionStorage.removeItem(SESSION_KEYS.TOKEN);
      queryClient.setQueryData([QUERY_KEYS.USER], null);
      navigate(ROUTES.LOGIN);
    },
  });

  const { mutate: login } = useMutation(fetchLogin, {
    onSuccess: (res) => {
      if (!token) storeToken(res.token);
      if (!storedUser) storeUser(res.user);
      queryClient.setQueriesData([QUERY_KEYS.USER], res.user);
      navigate(ROUTES.TODOS);
    },
    onError: handleError,
  });

  const { mutate: registerMutate } = useMutation(registerUser, {
    onSuccess: (auth: IAuth) => {
      if (!token) storeToken(auth.token);
      if (!storedUser) storeUser(auth.user);
      queryClient.setQueriesData([QUERY_KEYS.USER], auth.user);
      enqueueSnackbar("User Registered!!", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });

      navigate(`/${ROUTES.TODOS}`);
    },
    onError: handleError,
  });

  //handlers
  const handleLogout = (_e: any) => logout();

  const handleRegistrationBtnClick = (_e: any) => navigate(ROUTES.REGISTRATION);

  const navigateToLogin = (_e: any) => navigate(ROUTES.LOGIN);

  const handleUserRegistrationSubmit = (payload: IRegisterReq) =>
    registerMutate(payload);

  return {
    login,
    token,
    handlers: {
      handleLogout,
      navigateToLogin,
      handleRegistrationBtnClick,
      handleUserRegistrationSubmit,
    },
  };
};
