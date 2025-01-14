import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { useState } from "react";

export const SuggestedUser = () => {
  const { suggestedUser } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store?.auth);

  return (
    <div className="my-10">
      <div>
        <h1 className="font-semibold text-sm">Suggested For You</h1>
      </div>
      {suggestedUser &&
        suggestedUser.map((user) => {
          return (
            <div key={user?._id}>
              <div className="flex items-center gap-4 my-4">
                <Link to={`/profile/${user?._id}`}>
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={
                        user?.profilePicture || "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link to={`/profile/${user?._id}`}>
                    <h2 className="font-semibold text-sm"> {user?.username}</h2>
                    <span className="text-gray-600 text-sm">
                      {user.bio || "Bio Here....."}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
