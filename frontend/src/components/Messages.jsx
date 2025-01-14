import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useGetAllMessage } from "@/hooks/useGetAllMessage";

const Messages = ({ selectedUser }) => {
  useGetAllMessage();

  const { messages } = useSelector((store) => store.chat);
  return (
    <div className="overflow-y-auto flex-l p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <Avatar>
            <AvatarImage
              src={selectedUser?.profilePicture}
              alt="profilepicture"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {messages &&
          messages.map((msg) => {
            return (
              <div className="flex">
                <div>{msg.messages}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Messages;
