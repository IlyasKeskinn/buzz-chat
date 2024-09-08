import React from "react";
import ChatListHeader from "./ChatListHeader";
import ChatList from "./ChatList";
import SearchChatList from "./SearchChatList";
import chatListAtom from "@/atom/chatListAtom";
import { useRecoilValue } from "recoil";

const Chats = () => {
  const chatList = useRecoilValue(chatListAtom);

  return (
    <>
      <ChatListHeader />
      <SearchChatList chatList={chatList} />
      <ChatList chatList={chatList} />
    </>
  );
};

export default Chats;
