import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchLogin } from "api/auth";
//Types
import { QUERY_KEYS } from "constants";
import { useState } from "react";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {} = useMutation();
  const { data: auth, refetch } = useQuery(
    [QUERY_KEYS.LOGIN],
    () =>
      fetchLogin({
        email,
        password,
      }),
    { enabled: false }
  );

  return { auth, state: { email, password } };
};
