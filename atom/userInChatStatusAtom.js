import { atom } from "recoil";

const usersInChatAtom = atom({
  key: "UserInChatAtom",
  default: undefined,
});

export default usersInChatAtom;
