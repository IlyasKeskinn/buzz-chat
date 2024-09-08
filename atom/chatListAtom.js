import { atom } from "recoil";

const chatListAtom = atom({
  key: "ChatListAtom",
  default: [],
});

export default chatListAtom;
