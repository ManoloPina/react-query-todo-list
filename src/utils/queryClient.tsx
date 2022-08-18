import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function handleDefaultQueryError(error: unknown) {
  const title =
    error instanceof Error ? error.message : "Error connecting to the server";
  toast.error(title, { position: "top-right" });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: handleDefaultQueryError,
    },
  },
});
