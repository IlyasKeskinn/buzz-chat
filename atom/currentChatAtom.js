import { atom } from "recoil";

const currentChatAtom = atom({
  key: "CurrentChatAtom",
  default: undefined,
});

export default currentChatAtom;