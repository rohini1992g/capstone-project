import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import { useSelector } from "react-redux";
const MainLayout = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <div>
        <LeftSidebar />
      </div>
      <div>{user ? <Outlet /> : <Navigate to="/login" />}</div>
    </>
  );
};
export default MainLayout;
