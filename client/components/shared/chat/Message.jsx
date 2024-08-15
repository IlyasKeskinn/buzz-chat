import React from "react";

const Message = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.sender === "sender" ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <div className="relative max-w-md p-5">
        <div
          className={`px-4 py-2 rounded-xl shadow-lg  ${
            message.sender === "sender"
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-secondary text-secondary-foreground rounded-bl-none"
          }`}
        >
          <p className="p-1">{message.text}</p>
        </div>
        <p
          className={`text-xs text-muted-foreground ${
            message.sender === "sender" ? "text-end" : "text-start"
          }`}
        >
          15.03
        </p>
      </div>
    </div>
  );
};

export default Message;
