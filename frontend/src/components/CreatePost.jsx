import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRef } from "react";
import { useState } from "react";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";

export const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async () => {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);
    if (imagePreview) formData.append("image", file);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/post/addpost",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className=" max-h-4xl flex flex-col"
        >
          <DialogTitle>
            <DialogHeader className="text-center font-bold ">
              Create a post
            </DialogHeader>
            <div className="flex gap-3 items-center">
              <Avatar>
                <AvatarImage src={user?.profilePicture} alt="img" />
                <AvatarFallback>Cn</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-somibold text-xs">{user?.username}</h1>
                <span className="text-gray-600 text-xs">{user?.bio}</span>
              </div>
            </div>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="focus-visible:ring-transparent border-none"
              placeholder="Write a caption..."
            />
            {imagePreview && (
              <div className="w-full h-64 flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Image"
                  className="object-cover h-full w-full rounded-md"
                />
              </div>
            )}
            <div className="flex gap-2 my-2">
              <h2>@</h2>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location here.."
                className="focus-visible:ring-transparent border-none"
              />
            </div>

            <Input
              ref={imageRef}
              type="file"
              className="hidden"
              onChange={fileChangeHandler}
            />
            <div className="flex  justify-between my-3">
              <Button
                onClick={() => imageRef.current.click()}
                className="bg-[#0095F6] hover:bg-[#0095F6]"
              >
                Select From Computer
              </Button>
              {imagePreview &&
                (loading ? (
                  <Button>
                    <Loader2 className="mr-2 h-3 w-4 animate-spin" />
                    Please wait..
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={createPostHandler}
                    className="bg-[#0095F6] hover:bg-[#0095F6]"
                  >
                    Post
                  </Button>
                ))}
            </div>
          </DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
  );
};
