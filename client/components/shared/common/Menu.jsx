import ThemeButton from "@/components/shared/theme/ThemeButton";
import Image from "next/image";
import { LuUser } from "react-icons/lu";
import { RiMessage3Line, RiUserSearchLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

import MenuItem from "./MenuItem";
import Avatar from "./Avatar";
import { MenuConst } from "@/constants";
import menuAtom from "@/atom/menuAtom";
import { useSetRecoilState, useRecoilValue } from "recoil";

const Menu = ({ user }) => {
  const setActiveMenu = useSetRecoilState(menuAtom);
  const activeMenu = useRecoilValue(menuAtom);

  return (
    <div className="md:max-w-[80px] max-w-[100%] w-full md:max-h-screen max-h-[10%] md:order-1 order-2 bg-secondary z-100">
      <div className="flex h-full md:flex-col flex-row justify-center md:justify-between items-center py-5 px-2">
        <div className="md:block hidden">
          <div className="rounded-full w-20 h-20 overflow-hidden">
            <Image alt="logo" src={"/logo.png"} height={256} width={256} />
          </div>
        </div>
        <div className="flex md:flex-col flex-row gap-3 items-center justify-center">
          <MenuItem
            MenuName={MenuConst.PROFILE}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            <LuUser className="text-2xl" />
          </MenuItem>
          <MenuItem
            MenuName={MenuConst.DEFAULTMENU}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            <RiMessage3Line className="text-2xl" />
          </MenuItem>
          <MenuItem
            MenuName={MenuConst.CONTACTS}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            <RiUserSearchLine className="text-2xl" />
          </MenuItem>
          <MenuItem
            MenuName={MenuConst.SETTINGS}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            <IoSettingsOutline className="text-2xl" />
          </MenuItem>
        </div>
        <div className="md:flex md:flex-col hidden gap-3 items-center justify-center">
          <ThemeButton />
          <div onClick={() => setActiveMenu(MenuConst.PROFILE)}>
            <Avatar size="xs" imgURL={user.userInfo.avatarURL} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
