import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import currentChatAtom from "@/atom/currentChatAtom";
import { useEffect, useState } from "react";
import userAtom from "@/atom/userAtom";
import usersInChatAtom from "@/atom/userInChatStatusAtom";

const Chat = ({ socket }) => {
  const activeInUserChats = useRecoilValue(usersInChatAtom);
  const currentChat = useRecoilValue(currentChatAtom);
  const user = useRecoilValue(userAtom);
  const recieverUser = currentChat.chatRoom.participants.find(
    (member) => member._id !== user.userInfo._id
  );
  const [reciverUserInChat, setReciverUserInChat] = useState([]);

  useEffect(() => {
    if (activeInUserChats) {
      setReciverUserInChat(
        activeInUserChats.find(
          (room) =>
            room.roomId === currentChat.chatRoom._id &&
            room.users.some((userInRoom) => userInRoom === recieverUser._id)
        )
      );
    }
  }, [activeInUserChats]);

  useEffect(() => {
    socket.emit("join", {
      chatRoomId: currentChat.chatRoom._id,
      userId: user.userInfo?._id,
    });

    return () => {
      socket.emit("leave", {
        chatRoomId: currentChat.chatRoom._id,
        userId: user?.userInfo._id,
      });
    };
  }, [currentChat]);

  return (
    <>
      <div className="md:block  md:order-3 border-l border-b border-b-bee bg-background  max-w-[100%] w-full md:max-h-[100%] h-[100vh] ">
        <div>
          <ChatHeader reciverUserInChat={reciverUserInChat} />
          <ChatContainer socket={socket} />
          {!currentChat.blocked ? (
            <MessageBar socket={socket} />
          ) : (
            <div className="flex justify-center items-center">
              <p className="text-bee">
                You can no longer send messages to this person.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
