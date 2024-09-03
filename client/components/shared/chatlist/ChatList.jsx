import React from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "../common/SearchBar";
import ChatListItem from "./ChatListItem";
import { useRecoilValue } from "recoil";
import chatListAtom from "@/atom/chatListAtom";

const ChatList = () => {
  const chatList = useRecoilValue(chatListAtom);
    
  return (
    <div className="overflow-auto md:h-[80vh] h-[65vh]">
      {chatList.map((chatItem, index) => {
        return <ChatListItem key={index} chatSummaries={chatItem} />;
      })}
    </div>
  );
};

export default ChatList;
