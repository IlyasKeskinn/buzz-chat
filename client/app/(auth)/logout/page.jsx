"use client";
import chatListAtom from "@/atom/chatListAtom";
import currentChatAtom from "@/atom/currentChatAtom";
import filteredChatListAtom from "@/atom/filteredChatList";
import filteredContactsAtom from "@/atom/filteredContacts";
import menuAtom from "@/atom/menuAtom";
import playingAudioAtom from "@/atom/playinAudio";
import receiverAtom from "@/atom/receiverAtom";
import userAtom from "@/atom/userAtom";
import { logout } from "@/lib/lib";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { io } from "socket.io-client";

const Logout = () => {
  const HOST = process.env.NEXT_PUBLIC_HOST;
  const [user, setUser] = useRecoilState(userAtom);
  const resetChatList = useResetRecoilState(chatListAtom);
  const resetCurrentChat = useResetRecoilState(currentChatAtom);
  const resetFilteredChatList = useResetRecoilState(filteredChatListAtom);
  const resetFilteredContacts = useResetRecoilState(filteredContactsAtom);
  const resetMenuAtom = useResetRecoilState(menuAtom);
  const resetPlayingAudio = useResetRecoilState(playingAudioAtom);
  const resetRecieverAtom = useResetRecoilState(receiverAtom);

  const router = useRouter();
  useEffect(() => {
    const socket = io(HOST, {
      transports: ["websocket"],
    });

    // Emit sign-out event if user exists
    if (user) {
      socket.emit("sign-out", user.userInfo?._id);
    }

    // Sign out from Firebase
    signOut(firebaseAuth).finally(() => {
      // Reset all Recoil states
      resetChatList();
      resetCurrentChat();
      resetFilteredChatList();
      resetFilteredContacts();
      resetMenuAtom();
      resetPlayingAudio();
      resetRecieverAtom();

      // Perform any additional logout operations
      logout();

      // Clear localStorage
      localStorage.setItem("user", JSON.stringify(null));

      // Redirect to login page
      router.push("/login");
    });

    // Cleanup socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [
    HOST,
    user,
    router,
    resetChatList,
    resetCurrentChat,
    resetFilteredChatList,
    resetFilteredContacts,
    resetMenuAtom,
    resetPlayingAudio,
    resetRecieverAtom,
  ]);
  return <div></div>;
};

export default Logout;
