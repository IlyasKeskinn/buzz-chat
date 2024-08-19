import { LuCheck } from "react-icons/lu";
import { LuCheckCheck } from "react-icons/lu";

const MessageStatus = ({ recipients }) => {
  const status = recipients[0].status;
  return (
    <div className="flex items-center justify-end">
      {status === "sent" && (
        <LuCheck className="text-xs text-gray-500" />
      )}
      {status === "delivered" && (
        <LuCheckCheck className="text-xs text-gray-500" />
      )}
      {status === "read" && (
        <LuCheckCheck className="text-xs text-teal-500" />
      )}
    </div>
  );
};

export default MessageStatus;
