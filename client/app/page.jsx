"use client";
import userAtom from "@/atom/userAtom";
import ThemeButton from "@/components/shared/theme/ThemeButton";
import Image from "next/image";
import { useState } from "react";
import { LuUserCheck } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { RiContactsLine } from "react-icons/ri";
import { useRecoilState } from "recoil";

const SidebarMenuItem = ({ active, label }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  
  console.log(user);
  

  return (
    <div
      className={`py-3 px-5 rounded-xl flex justify-start items-center cursor-pointer transition-all duration-200 ${
        active
          ? "bg-primary text-primary-foreground" // Aktif durum
          : isHovered
          ? "bg-muted text-muted-foreground" // Hover durumu
          : "bg-transparent text-foreground" // Varsayılan durum
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <LuUserCheck className="text-2xl mr-3" />
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen flex">
      <aside className="md:max-w-20 flex-1 bg-secondary">
        <div className="flex h-full md:flex-col flex-row justify-between items-center py-5 px-2">
          <div>
            <div className="rounded-full w-20 h-20 overflow-hidden">
              <Image alt="logo" src={"/logo.png"} height={256} width={256} />
            </div>
          </div>
          <div>
            <SidebarMenuItem active={false} />
          </div>
          <div>
            <ThemeButton />
          </div>
        </div>
      </aside>
    </main>
  );
}
