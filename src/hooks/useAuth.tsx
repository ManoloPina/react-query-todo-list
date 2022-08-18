import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLogin, fetchLogout } from "api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
//Types
import { QUERY_KEYS, SESSION_KEYS, ROUTES } from "constants";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const token = sessionStorage.getItem(SESSION_KEYS.TOKEN);
  const storedUser = !!sessionStorage.getItem(SESSION_KEYS.USER)
    ? JSON.parse(sessionStorage.getItem(SESSION_KEYS.USER) as string)
    : null;

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
      if (!token) sessionStorage.setItem(SESSION_KEYS.TOKEN, res.token);
      if (!storedUser)
        sessionStorage.setItem(SESSION_KEYS.USER, JSON.stringify(res.user));
      queryClient.setQueriesData([QUERY_KEYS.USER], res.user);
      navigate(ROUTES.TODOS);
    },
    onError: (error: any) => {
      toast.error(error.message, { position: "top-right" });
    },
  });

  //handlers
  const handleLogout = (_e: any) => logout();

  return { login, token, handlers: { handleLogout } };
};
