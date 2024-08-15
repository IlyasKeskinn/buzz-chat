import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";
const Chat = () => {
  return (
    <div className="md:block hidden md:order-3 border-l border-b bg-background  max-w-[100%] w-full md:max-h-[100%] h-[100%] ">
      <div>
        <ChatHeader />
        <ChatContainer />
        <MessageBar />
      </div>
    </div>
  );
};

export default Chat;
