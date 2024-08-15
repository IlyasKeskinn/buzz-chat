import React from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "../common/SearchBar";
import ChatList from "./ChatList";

const Chats = () => {
  return (
    <>
      <ChatListHeader />
      <SearchBar />
      <ChatList />
    </>
  );
};

export default Chats;
