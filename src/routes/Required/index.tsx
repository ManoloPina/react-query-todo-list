import React from "react";
import { useUser } from "hooks";
import { Outlet, Navigate } from "react-router-dom";
//Types
import { ROUTES } from "constants";

interface Props {}

const Required: React.FC<Props> = ({}) => {
  const { user } = useUser();

  return !!user?._id ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export { Required };
