import React, { useState } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const history = useHistory();
  const [input, setInput] = useState({
    password: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const forgetHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/resetPassword/${id}/${token}`,
        input,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.Status === "Success") {
        navigate("/login");

        toast.success(res.data.Status);
        setInput({
          email: "",
        });
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.Status);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={forgetHandler}
        className="shadow-lg flex flex-col gap-5 p-8"
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">The Gram</h1>
          <p className="text-sm text-center">Connect with friends</p>
        </div>

        <div>
          <span className="font-medium">Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
          />
        </div>

        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Update</Button>
        )}
        <div className=" ml-10  items-center">
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
