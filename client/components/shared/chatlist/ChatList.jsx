import React from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "../common/SearchBar";
import ChatListItem from "./ChatListItem";

const ChatList = () => {
  return (
    <div className="overflow-auto md:h-[80vh] h-[65vh]">
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
    </div>
  );
};

export default ChatList;
