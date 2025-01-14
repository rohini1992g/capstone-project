import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useRef } from "react";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";

const EditProfile = () => {
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const [input, setInput] = useState({
    profilePhoto: user?.profilePicture,
    bio: user?.bio,
    location: user?.location,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({
        ...input,
        profilePhoto: file,
      });
    }
  };

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("location", input.location);
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/profile/edit",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },

          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedUserData = {
          ...user,
          bio: res.data.user?.bio,
          profilePicture: res.data.user?.profilePicture,
          location: res.data.user?.location,
        };
        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-2xl mx-auto pl-10">
      <section className="flex flex-col gap-6 w-full my-8">
        <h1 className="font-bold text-xl pt-4">Edit profile</h1>
        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
          <div className="'flex items-center gap-3">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src={user?.profilePicture || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-sm">{user?.username}</h2>
              <span className="text-gray-600">
                {user.bio || "Bio Here....."}
              </span>
            </div>
          </div>
          <input
            ref={imageRef}
            onChange={fileChangeHandler}
            type="file"
            className="hidden"
          />
          <Button
            className="bg-[#0095F6]"
            onClick={() => imageRef?.current.click()}
          >
            Change Photo
          </Button>
        </div>
        <div>
          <h1 className="font-bold text-xl">Bio</h1>
          <Textarea
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            name="bio"
            className="focus-visible:ring-transparent"
          />
        </div>
        <div>
          <h1 className="font-bold text-xl"> Location</h1>
          <input
            type="text"
            value={input.location}
            onChange={(e) => setInput({ ...input, location: e.target.value })}
            name="location"
            className="bg-gray-100 rounded-xl p-4"
            placeholder="Enter location here"
          />
        </div>
        <div className="flex justify-end">
          {loading ? (
            <Button className="bg-[#0095F6]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button onClick={editProfileHandler} className="bg-[#0095F6]">
              Submit
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};
export default EditProfile;
