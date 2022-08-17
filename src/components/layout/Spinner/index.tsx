import React from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
//Components
import { CircularProgress, Backdrop } from "@mui/material";

interface Props {}

const Spinner: React.FC<Props> = React.memo(() => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  return (
    <Backdrop open={isFetching > 0 || isMutating > 0}>
      <CircularProgress
        size="4.2rem"
        hidden={isFetching === 0 || isMutating === 0}
      />
    </Backdrop>
  );
});

export { Spinner };
