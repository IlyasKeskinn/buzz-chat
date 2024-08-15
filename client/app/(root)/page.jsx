"use client";
import userAtom from "@/atom/userAtom";
import Menu from "@/components/shared/common/Menu";
import PageLoading from "@/components/shared/common/PageLoading";
import { useRecoilValue } from "recoil";

export default function Home() {
  const user = useRecoilValue(userAtom);

  return (
    <>
      {!user && <PageLoading />}
      {user && (
        <main className="flex md:flex-row flex-col h-screen w-screen max-h-screen max-w-full overflow-hidden">
          <Menu user={user} />
        </main>
      )}
    </>
  );
}
