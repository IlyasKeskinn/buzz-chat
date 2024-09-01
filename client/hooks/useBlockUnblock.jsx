import { useRecoilState } from "recoil";
import userAtom from "@/atom/userAtom";
import { blockUnblockUser } from "@/lib/actions/user.actions";
import currentChatAtom from "@/atom/currentChatAtom";
import { useState } from "react";

const useBlockUnblock = (user) => {
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const [currentChat, setCurentChat] = useRecoilState(currentChatAtom);

  const [isBlockUser, setBlockUser] = useState(
    currentUser.userInfo.blockedUsers.includes(user._id)
  );

  const handleBlockUser = async () => {
    const data = {
      blockUserId: user._id,
      currentUserId: currentUser.userInfo._id,
    };
    let blockedChat = false;
    try {
      await blockUnblockUser(data);
      let updatedBlockedUsers;
      if (isBlockUser) {
        updatedBlockedUsers = currentUser.userInfo.blockedUsers.filter(
          (id) => id !== user._id
        );
        blockedChat = false;
      } else {
        updatedBlockedUsers = [...currentUser.userInfo.blockedUsers, user._id];
        blockedChat = true;
      }

      const updatedUser = {
        ...currentUser.userInfo,
        blockedUsers: updatedBlockedUsers,
      };
      // Update localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ newUser: false, userInfo: updatedUser })
      );

      // Update the Recoil state
      setCurrentUser({ newUser: false, userInfo: updatedUser });

      setBlockUser(!isBlockUser);

      if (currentChat) {
        if (
          currentChat.chatRoom.participants.some(
            (chatUser) => chatUser._id === user._id
          )
        ) {
          const updatedChat = {
            ...currentChat,
            blocked: blockedChat,
          };
          setCurentChat(updatedChat);
        }
      }
    } catch (error) {}
  };
  return { isBlockUser, handleBlockUser };
};

export default useBlockUnblock;
