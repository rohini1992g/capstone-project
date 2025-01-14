import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from "./Comment";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";
import { useEffect } from "react";
import { toast } from "sonner";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");

  const { selectedPost, posts } = useSelector((store) => store.post);
  const [comment, setComment] = useState([]);

  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const sendMesssageHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${selectedPost?._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost?._id
            ? { ...p, comments: updatedCommentData }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className=" max-w-3xl flex flex-col"
      >
        <DialogTitle>
          <div className="flex flex-1">
            <div className="w-1/2">
              <img
                src={selectedPost?.image}
                alt=""
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>

            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex items-center justify-between p-4">
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                    <AvatarFallback>CNss</AvatarFallback>
                  </Avatar>

                  <div>
                    <span className="font-semibold text-xs">
                      {selectedPost?.author?.username}
                    </span>
                    {/* <span className="text-gray-600 text-sm">Bio Here..</span> */}
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className="flex flex-col items-center text-sm text-center">
                      <div className="cursor-pointer w-full font-bold justify-center">
                        Unfollow
                      </div>
                    </DialogTitle>
                  </DialogContent>
                </Dialog>
              </div>
              <hr />
              <div className="flex-1 overflow-y-auto max-h-96 p-4">
                {comment?.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <input
                    onChange={changeEventHandler}
                    value={text}
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full outline-none border text-sm border-gray-300 p-2 rounded"
                  />
                  <Button
                    disabled={!text.trim()}
                    variant="outline"
                    onClick={sendMesssageHandler}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
export default CommentDialog;
