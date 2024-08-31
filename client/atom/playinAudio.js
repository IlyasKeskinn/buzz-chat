import { atom } from "recoil";

const playingAudioAtom = atom({
  key: "PlayingAudioAtom",
  default: null,
});

export default playingAudioAtom;
