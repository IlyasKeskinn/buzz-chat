import { useCallback, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { getMessages } from "@/lib/actions/messages.actions";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import currentChatAtom from "@/atom/currentChatAtom";
import messageAtom from "@/atom/messageaAtom";
import userAtom from "@/atom/userAtom";
import EmptyChat from "./EmptyChat";
import chatListAtom from "@/atom/chatListAtom";

const ChatContainer = ({ socket, reciverUserInChat }) => {
  const [messages, setMessages] = useRecoilState(messageAtom);
  const setChatList = useSetRecoilState(chatListAtom);
  const chatRoom = useRecoilValue(currentChatAtom);
  const user = useRecoilValue(userAtom);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const messageData = await getMessages(
          chatRoom.chatRoom._id,
          user.userInfo._id
        );
        setMessages(messageData);
        scrollToBottom();
      } catch (error) {}
    };
    fetchMessage();
  }, [setMessages, chatRoom]);

  useEffect(() => {
    scrollToBottom();
    if (chatRoom) {
      setChatList((prevChatSummaries = []) => {
        const chatSummaryIndex = prevChatSummaries.findIndex(
          (chat) => chat.chatRoomId === chatRoom.chatRoom._id
        );
        if (chatSummaryIndex !== -1) {
          const updatedChatSummaries = [...prevChatSummaries];
          const chatSummary = updatedChatSummaries[chatSummaryIndex];

          updatedChatSummaries[chatSummaryIndex] = {
            ...chatSummary,
            unreadMessages: 0,
          };
          return updatedChatSummaries;
        }

        // Return the previous state if no changes are needed
        return prevChatSummaries;
      });
    }
  }, [messages, chatRoom]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div className="h-[82vh] overflow-auto">
      {messages.length <= 0 ? (
        <EmptyChat />
      ) : (
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      )}
      <div ref={messagesEndRef} className="h-2" />
    </div>
  );
};

export default ChatContainer;
