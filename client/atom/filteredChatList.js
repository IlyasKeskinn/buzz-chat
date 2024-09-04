import { atom } from "recoil";

const filteredChatListAtom = atom({
  key: "FilteredChatList",
  default: [],
});

export default filteredChatListAtom;
