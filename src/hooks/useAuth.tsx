import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLogin } from "api/auth";
import { QUERY_KEYS, SESSION_KEYS } from "constants";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const token = sessionStorage.getItem(SESSION_KEYS.TOKEN);

  const { mutate: login } = useMutation(fetchLogin, {
    onSuccess: (res) => {
      if (!token) sessionStorage.setItem(SESSION_KEYS.TOKEN, res.token);
      queryClient.setQueriesData([QUERY_KEYS.AUTH], res);
    },
  });

  return { login, token };
};
