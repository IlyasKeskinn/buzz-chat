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

export default function Home() {
  const user = useRecoilValue(userAtom);
  const chatRoom = useRecoilValue(currentChatAtom);
  const setSocket = useSetRecoilState(socketAtom);
  const [messages, setMessages] = useRecoilState(messageAtom);
  const [socketEvent, setSocketEvent] = useState(false);
  const socket = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (user?.userInfo._id && !socket.current) {
      socket.current = io("http://localhost:3000", {
        transports: ["websocket"],
      });
      socket.current.emit("add-user", user.userInfo._id);
      setSocket(socket.current.id);
    }
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

  return (
    <>
      <audio ref={audioRef} preload="auto" className="hidden" src="/sounds/newMessage.mp3" />
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
