import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants";
import { fetchUser } from "api/auth";

export const useUser = () => {
  const { data: user } = useQuery([QUERY_KEYS.USER], fetchUser);
  return { user };
};
