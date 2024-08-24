import userAtom from "@/atom/userAtom";
import { calculateTime } from "@/utils/CalculateTime";
import { useRecoilValue } from "recoil";
import MessageStatus from "../common/MessageStatus";
import TextMessage from "./TextMessage";
import ImageMessage from "./ImageMessage";
import dynamic from "next/dynamic";
import VoiceMessage from "./VoiceMessage";
// const VoiceMessage = dynamic(() => import("./VoiceMessage"), { ssr: false });


const Message = ({ message }) => {
  const user = useRecoilValue(userAtom);

  return (
    <>
      {message.messageType === "text" && (
        <TextMessage user={user} message={message} />
      )}

      {message.messageType === "image" && (
        <ImageMessage user={user} message={message} />
      )}

      {message.messageType === "voice" && (
        <VoiceMessage user={user} message={message} />
      )}
    </>
  );
};

export default Message;
