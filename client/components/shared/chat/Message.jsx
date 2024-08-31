import userAtom from "@/atom/userAtom";
import { useRecoilValue } from "recoil";
import TextMessage from "./TextMessage";
import ImageMessage from "./ImageMessage";
import VoiceMessage from "./VoiceMessage";

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
