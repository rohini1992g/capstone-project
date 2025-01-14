import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const { user } = useSelector((store) => store.auth);
  return user ? <Outlet /> : <Navigate to="/login" />;
};
