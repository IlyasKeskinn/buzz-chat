import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "./MessageStatus";

const FoundedMessage = ({ user, message }) => {
  return (
    <div id={message._id} className={`flex mb-2`}>
      <div className="relative w-full p-5">
        <div
          className={`px-4 py-2 rounded-xl shadow-lg break-words  ${
            message.sender !== user.userInfo._id
              ? "bg-secondary text-secondary-foreground rounded-bl-none"
              : "bg-primary text-primary-foreground rounded-br-none"
          }`}
        >
          <p className="p-1">{message.message}</p>
          <div className="flex justify-between px-1 gap-8">
            {message.sender === user.userInfo._id && (
              <MessageStatus recipients={message.recipientStatuses} />
            )}
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

export default FoundedMessage;
