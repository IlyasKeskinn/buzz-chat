import { atom } from "recoil";

const filteredContactsAtom = atom({
  key: "FilteredContacts",
  default: [],
});

export default filteredContactsAtom;
