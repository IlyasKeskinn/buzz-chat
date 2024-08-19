import userAtom from "@/atom/userAtom";
import { calculateTime } from "@/utils/CalculateTime";
import { useRecoilValue } from "recoil";
import MessageStatus from "../common/MessageStatus";

const Message = ({ message }) => {
  const user = useRecoilValue(userAtom);

  return (
    <div
      className={`flex ${
        message.sender !== user.userInfo._id ? "justify-start" : "justify-end"
      } mb-2`}
    >
      <div className="relative max-w-md p-5">
        <div
          className={`px-4 py-2 rounded-xl shadow-lg break-words  ${
            message.sender !== user.userInfo._id
              ? "bg-secondary text-secondary-foreground rounded-bl-none"
              : "bg-primary text-primary-foreground rounded-br-none"
          }`}
        >
          <p className="p-1">{message.message}</p>
          <div className="flex justify-between px-1 gap-8">
            <MessageStatus recipients={message.recipientStatuses} />
            <div
              className={`text-xs text-gray-500 ${
                message.sender !== user.userInfo._id ? "text-start" : "text-end"
              }`}
            >
              {calculateTime(message.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
