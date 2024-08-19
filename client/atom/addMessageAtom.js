import { atom } from "recoil";

const addMessageAtom = atom({
  key: "AddMessageAtom",
  default: [],
});
export default addMessageAtom;