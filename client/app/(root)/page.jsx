"use client";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
import onlineUsersAtom from "@/atom/onlineUsersAtom";

export default function Home() {
  const user = useRecoilValue(userAtom);
  const chatRoom = useRecoilValue(currentChatAtom);
  const setSocket = useSetRecoilState(socketAtom);
  const setMessages = useSetRecoilState(messageAtom);
  const setChatList = useSetRecoilState(chatListAtom);
  const setOnlineUsers = useSetRecoilState(onlineUsersAtom);
  const [loading, setLoading] = useState(true);
  const socket = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (user?.userInfo._id && !socket.current) {
      socket.current = io("http://localhost:3000", {
        transports: ["websocket"],
      });
      socket.current.emit("add-user", user.userInfo._id);
      setSocket(socket.current.id);
      socket.current.on("online-users", ({ onlineUsers }) => {
        setOnlineUsers(onlineUsers);
      });
    }

    return () => socket.current?.off("online-users");
  }, [socket.current, user]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        if (audioRef.current) {
          audioRef.current.play();
        }

        if (chatRoom) {
          if (chatRoom.chatRoom._id === data.chatRoomId) {
            setMessages((prevMsg) => [...prevMsg, data.message]);
          }
        }
        handleNewMessageInitial(data);
      });
      socket.current.on("online-users", ({ onlineUsers }) => {
        setOnlineUsers(onlineUsers);
      });
    }
    return () => {
      socket.current?.off("msg-recieve");
      socket.current?.off("online-users");
    };
  }, [socket.current, chatRoom]);

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

    const updateMessageStatus = async () => {
      await updateMessageStatusToDelivered(user.userInfo._id);
    };

    if (user) {
      handleInitialMessage();
      updateMessageStatus();
    }
  }, [user]);

  const handleNewMessageInitial = (data) => {
    setChatList((prevChatSummaries) => {
      // Find the chat summary for the chatRoom
      const chatSummaryIndex = prevChatSummaries.findIndex(
        (chat) => chat.chatRoomId === data.chatRoomId
      );

      if (chatSummaryIndex !== -1) {
        // Chat summary exists, update the last message and unread count
        const updatedChatSummaries = [...prevChatSummaries];
        const chatSummary = updatedChatSummaries[chatSummaryIndex];

        updatedChatSummaries[chatSummaryIndex] = {
          ...chatSummary,
          lastMessage: data.message,
          unreadMessages: chatSummary.unreadMessages + 1,
        };

        return updatedChatSummaries;
      } else {
        // Chat summary doesn't exist, create a new one
        return [
          ...prevChatSummaries,
          {
            chatRoomId: data.chatRoomId,
            lastMessage: data.message,
            unreadMessages: 1,
            receiverUsers: [data.senderUser], // You can populate this with actual data if available
          },
        ];
      }
    });
  };

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
