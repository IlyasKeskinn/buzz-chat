import { MenuConst } from "@/constants";
import { atom } from "recoil";

const menuAtom = atom({
  key: "menuAtom",
  default: "CHATS",
});

export default menuAtom;
