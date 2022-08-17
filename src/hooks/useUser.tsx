import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS, SESSION_KEYS } from "constants";
import { fetchUser } from "api/auth";

export const useUser = () => {
  const storedUser = !!sessionStorage.getItem(SESSION_KEYS.USER)
    ? JSON.parse(sessionStorage.getItem(SESSION_KEYS.USER) as string)
    : null;

  const { data: user } = useQuery([QUERY_KEYS.USER], fetchUser, {
    initialData: storedUser,
    retry: false,
  });

  return { user, storedUser };
};
