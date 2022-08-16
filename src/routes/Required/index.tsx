import React, { useEffect } from "react";
import { useUser } from "hooks";
import { Outlet, Navigate } from "react-router-dom";
//Types
import { ROUTES } from "constants";

interface Props {}

const Required: React.FC<Props> = ({}) => {
  const { user } = useUser();

  return !!user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export { Required };
