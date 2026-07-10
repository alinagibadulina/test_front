import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./router";

export const ProtectedRoute = () => {
  const isAuth = sessionStorage.getItem("isAuth");

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};
