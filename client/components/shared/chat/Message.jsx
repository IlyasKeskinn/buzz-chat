import userAtom from "@/atom/userAtom";
import { calculateTime } from "@/utils/CalculateTime";
import { useRecoilValue } from "recoil";
import MessageStatus from "../common/MessageStatus";
import Image from "next/image";

const Message = ({ message }) => {
  const user = useRecoilValue(userAtom);

  return (
    <>
      {message.messageType === "text" && (
        <div
          className={`flex ${
            message.sender !== user.userInfo._id
              ? "justify-start"
              : "justify-end"
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
                {message.sender === user.userInfo._id && (
                  <MessageStatus recipients={message.recipientStatuses} />
                )}
                <div
                  className={`text-xs text-gray-500 ${
                    message.sender !== user.userInfo._id
                      ? "text-start"
                      : "text-end"
                  }`}
                >
                  {calculateTime(message.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {message.messageType === "image" && (
        <div
          className={`flex ${
            message.sender !== user.userInfo._id
              ? "justify-start"
              : "justify-end"
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
              <div className="p-1 w-full object-cover object-center rounded-xl">
                <Image
                  src={message.message}
                  alt={message.message}
                  width={300}
                  height={300}
                  className="rounded-xl"
                />
              </div>
              <div className="flex justify-between px-1 gap-8">
                {message.sender === user.userInfo._id && (
                  <MessageStatus recipients={message.recipientStatuses} />
                )}
                <div
                  className={`text-xs text-gray-500 ${
                    message.sender !== user.userInfo._id
                      ? "text-start"
                      : "text-end"
                  }`}
                >
                  {calculateTime(message.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
