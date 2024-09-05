import { atom } from "recoil";

const onlineUsersAtom = atom({
  key: "OnlineUsersAtom",
  default: [],
});

export default onlineUsersAtom;
