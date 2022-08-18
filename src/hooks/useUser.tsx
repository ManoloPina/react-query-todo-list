import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS, SESSION_KEYS } from "constants";
import { fetchUser } from "api/auth";

const storedUser = !!sessionStorage.getItem(SESSION_KEYS.USER)
  ? JSON.parse(sessionStorage.getItem(SESSION_KEYS.USER) as string)
  : null;

export const useUser = () => {
  const { data: user } = useQuery([QUERY_KEYS.USER], fetchUser, {
    initialData: storedUser,
    retry: false,
    enabled: false,
  });

  return { user, storedUser };
};
