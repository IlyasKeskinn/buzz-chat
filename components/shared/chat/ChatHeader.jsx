import Avatar from "../common/Avatar";
import receiverAtom from "@/atom/receiverAtom";
import { IoMdArrowBack } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import currentChatAtom from "@/atom/currentChatAtom";
import SearchMessage from "./SearchMessage";
import UserProfileDialog from "../common/UserProfileDialog";
import onlineUsersAtom from "@/atom/onlineUsersAtom";
import userInChatAtom from "@/atom/userInChatStatusAtom";

const ChatHeader = ({ reciverUserInChat }) => {
  const receiverUser = useRecoilValue(receiverAtom);
  const onlineUsers = useRecoilValue(onlineUsersAtom);
  const setCurrentChat = useSetRecoilState(currentChatAtom);

  return (
    <>
      <div className="h-[10dvh] max-h-[10dvh]: w-full border-b shadow ">
        <div className="flex h-full justify-between items-center px-5">
          <div className="flex justify-between items-center gap-4">
            <div className="flex justify-center items-center">
              <IoMdArrowBack
                className="text-2xl me-2 cursor-pointer"
                onClick={() => {
                  setCurrentChat(undefined);
                }}
              />
              <div>
                <UserProfileDialog
                  user={receiverUser}
                  trigger={
                    <div className="flex justify-center items-center">
                      <Avatar size="sm" imgURL={receiverUser.avatarURL} />
                    </div>
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-lg">
                {receiverUser.username.charAt(0).toUpperCase() +
                  receiverUser.username.slice(1).toLowerCase()}
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full border animate-pulse ${
                    onlineUsers.includes(receiverUser._id)
                      ? "bg-green-400 shadow"
                      : "bg-gray-400 shadow"
                  }`}
                ></div>
                <p className="text-xs text-gray-400 animate-pulse">
                  {reciverUserInChat
                    ? "in chat"
                    : onlineUsers.includes(receiverUser._id)
                    ? "online"
                    : "offline"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <SearchMessage
              child={
                <div className="p-2 m-2 cursor-pointer w-8">
                  <IoSearchSharp />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
