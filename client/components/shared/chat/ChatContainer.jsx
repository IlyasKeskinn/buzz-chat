import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import Empty from "../Empty";
import { getMessages } from "@/lib/actions/messages.actions";
import { useRecoilState, useRecoilValue } from "recoil";
import currentChatAtom from "@/atom/currentChatAtom";
import messageAtom from "@/atom/messageaAtom";
import userAtom from "@/atom/userAtom";
import EmptyChat from "./EmptyChat";

const ChatContainer = () => {
  const [messages, setMessages] = useRecoilState(messageAtom);
  const chatRoom = useRecoilValue(currentChatAtom);
  const user = useRecoilValue(userAtom);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const messageData = await getMessages(chatRoom._id, user.userInfo._id);
        setMessages(messageData);
        scrollToBottom();
      } catch (error) {}
    };
    fetchMessage();
  }, [setMessages, chatRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContainer;
