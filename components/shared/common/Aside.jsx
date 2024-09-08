import { useRecoilValue } from "recoil";
import Chats from "../chatlist/Chats";
import menuAtom from "@/atom/menuAtom";
import { MenuConst } from "@/constants";
import Profile from "../profile/Profile";
import Contacts from "../contacts/Contacts";
import currentChatAtom from "@/atom/currentChatAtom";
import Settings from "../settings/Settings";

const Aside = () => {
  const activeMenu = useRecoilValue(menuAtom);
  const chatRoom = useRecoilValue(currentChatAtom);

  return (
    <aside
      className={`
      ${chatRoom ? "hidden" : "block"} 
      md:block
    md:order-2 order-1 md:max-w-[300px] max-w-[100%] w-full md:max-h-[100%] h-[100%] bg-secondary/50 z-10`}
    >
      {activeMenu === MenuConst.DEFAULTMENU && <Chats />}
      {activeMenu === MenuConst.PROFILE && <Profile />}
      {activeMenu === MenuConst.CONTACTS && <Contacts />}
      {activeMenu === MenuConst.SETTINGS && <Settings />}
    </aside>
  );
};

export default Aside;
