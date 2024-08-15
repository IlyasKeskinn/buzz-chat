"use client";
import userAtom from "@/atom/userAtom";
import Chat from "@/components/shared/chat/Chat";
import Aside from "@/components/shared/common/Aside";
import Menu from "@/components/shared/common/Menu";
import PageLoading from "@/components/shared/common/PageLoading";
import Empty from "@/components/shared/Empty";
import { useRecoilValue } from "recoil";

export default function Home() {
  const user = useRecoilValue(userAtom);

  const selectedChat = false;
  return (
    <>
      {!user && <PageLoading />}
      {user && (
        <main className="flex md:flex-row flex-col h-screen w-screen max-h-screen max-w-full overflow-hidden">
          <Menu user={user} />
          <Aside />
          {selectedChat ? <Chat /> : <Empty />}
        </main>
      )}
    </>
  );
}
