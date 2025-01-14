import React from "react";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import { useGetSuggestedUser } from "@/hooks/useGetSuggestedUser";
import { useGetAllPost } from "@/hooks/useGetAllPost";
const Home = () => {
  useGetAllPost();

  useGetSuggestedUser();

  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  );
};
export default Home;
