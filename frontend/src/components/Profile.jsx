import useGetUserProfile from "@/hooks/useGetUserProfile";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import axios from "axios";

const Profile = () => {
  const params = useParams();
  const userId = params.id;

  const { userProfile, user } = useSelector((store) => store.auth);
  const userLoggedInProfile = user?._id === userProfile?._id;
  const [isFollowed, setIsFollowed] = useState(
    userProfile?.followers?.includes(user?._id) || false
  );

  useGetUserProfile(userId);

  const displayPost = "posts" ? userProfile?.posts : "No post send";

  const followUnfollowHandler = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/followorunfollow/${id}`,

        { followerId: user?._id },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        if (isFollowed) setIsFollowed(false);
        else {
          setIsFollowed(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar className="h-40 w-40">
              <AvatarImage
                src={
                  userProfile?.profilePicture || "https://github.com/shadcn.png"
                }
                alt="Profile_image"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col ml-5">
              <div className="font-semibold text-xl">
                <span>{userProfile?.username}</span>
              </div>
              <div>
                <span>{userProfile?.bio}</span>
              </div>
              {userLoggedInProfile ? (
                <Link to="/account/edit">
                  <Button variant="secondary" className="bg-gray-250 ">
                    Edit Profile
                  </Button>
                </Link>
              ) : isFollowed ? (
                <div className="w-15">
                  <Button
                    className="bg-[#0095F6] hover:bg-[#3192d2] h-8  mt-4 "
                    onClick={() => followUnfollowHandler(userProfile?._id)}
                  >
                    Unfollow
                  </Button>
                </div>
              ) : (
                <div className="w-15">
                  <Button
                    className="bg-[#0095F6] hover:bg-[#3192d2] h-8 w-13 mt-4"
                    onClick={() => followUnfollowHandler(userProfile?._id)}
                  >
                    Follow
                  </Button>
                </div>
              )}
            </div>

            <div className="font-semibold text-xl">
              <h1 className="font-semibold text-xl ml-6 mt-4">
                Location : {userProfile?.location}
              </h1>
              <span className="pl-6"></span>
            </div>

            <div className="ml-5 flex gap-7 pt-5">
              <p>
                {userProfile?.posts.length}
                <span className="font-semibold pl-1">posts</span>
              </p>
              <p>
                {userProfile?.followers.length}
                <span className="font-semibold pl-1">followers</span>
              </p>
              <p>
                {userProfile?.following.length}
                <span className="font-semibold pl-1">following</span>
              </p>
            </div>
          </section>
        </div>
        <div>
          Posts
          <hr />
          <div className="flex ">
            {
              <div className="grid grid-cols-3 gap-1">
                {displayPost.map((post) => {
                  return (
                    <div key={post?._id} className="relative ">
                      <img
                        src={post.image}
                        alt="postImage"
                        className="rounded-sm my-2 w-full aspect-square object-cover h-23 w-23"
                      />
                    </div>
                  );
                })}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
