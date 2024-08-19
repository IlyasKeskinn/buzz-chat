import { atom } from "recoil";

const messageAtom = atom({
  key: "MessageAtom",
  default: [],
});
export default messageAtom;