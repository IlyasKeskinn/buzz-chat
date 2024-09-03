"use client";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import io from "socket.io-client";
import userAtom from "@/atom/userAtom";
import currentChatAtom from "@/atom/currentChatAtom";
import messageAtom from "@/atom/messageaAtom";
import socketAtom from "@/atom/socketAtom";
import Chat from "@/components/shared/chat/Chat";
import Aside from "@/components/shared/common/Aside";
import Menu from "@/components/shared/common/Menu";
import PageLoading from "@/components/shared/common/PageLoading";
import Empty from "@/components/shared/Empty";
import {
  getInitialMessages,
  updateMessageStatusToDelivered,
} from "@/lib/actions/messages.actions";
import chatListAtom from "@/atom/chatListAtom";

export default function Home() {
  const user = useRecoilValue(userAtom);
  const chatRoom = useRecoilValue(currentChatAtom);
  const setSocket = useSetRecoilState(socketAtom);
  const [messages, setMessages] = useRecoilState(messageAtom);
  const [chatList, setChatList] = useRecoilState(chatListAtom);
  const [socketEvent, setSocketEvent] = useState(false);
  const [loading, setLoading] = useState(true);
  const socket = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const addUserSocket = async () => {
      if (user?.userInfo._id && !socket.current) {
        socket.current = io("http://localhost:3000", {
          transports: ["websocket"],
        });
        socket.current.emit("add-user", user.userInfo._id);
        await updateMessageStatusToDelivered(user.userInfo._id);
        setSocket(socket.current.id);
      }
    };
    addUserSocket();
  }, [socket.current, user]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-recieve", (data) => {
        setMessages((prevMsg) => [...prevMsg, data]);
        if (audioRef.current) {
          audioRef.current.play();
        }
      });

      setSocketEvent(true);
    }
  }, [socket.current, socketEvent]);

  useEffect(() => {
    const handleInitialMessage = async () => {
      try {
        const chatSummaries = await getInitialMessages(user.userInfo._id);
        setChatList(chatSummaries);
      } catch (error) {
        console.error("Failed to fetch chat summaries:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      handleInitialMessage();
    }
  }, [user]);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
        src="/sounds/newMessage.mp3"
      />
      {!user && <PageLoading />}
      {user && (
        <main className="flex md:flex-row flex-col h-screen w-screen max-h-screen max-w-full overflow-hidden">
          <Menu user={user} />
          <Aside />
          {chatRoom ? <Chat socket={socket.current} /> : <Empty />}
        </main>
      )}
    </>
  );
}
