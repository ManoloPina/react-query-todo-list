import { useSnackbar } from "notistack";
export const useHttp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleError = (...args: any) => {
    const [error] = args;
    enqueueSnackbar(
      error instanceof Error ? error.message : "Internal Server Error",
      {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      }
    );
  };

  return { handlers: { handleError } };
};
