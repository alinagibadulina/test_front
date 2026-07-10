import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./router";

export const GuestRoute = () => {
  const isAuth = sessionStorage.getItem("isAuth");

  return isAuth ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
};
