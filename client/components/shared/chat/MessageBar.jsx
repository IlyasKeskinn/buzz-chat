import { HiOutlineMicrophone } from "react-icons/hi2";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import {
  createMessage,
  sendAudioMessage,
  sendImageMessage,
} from "@/lib/actions/messages.actions";
import { useToast } from "@/components/ui/use-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import EmojiPicker from "emoji-picker-react";
import userAtom from "@/atom/userAtom";
import currentChatAtom from "@/atom/currentChatAtom";
import messageAtom from "@/atom/messageaAtom";
import SendPhotoDialog from "./SendPhotoDialog";
import CaptureAudio from "../common/CaptureAudio";
import { SendPhotoDropdown } from "../common/SendPhotoDropdown";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorage } from "@/utils/FirebaseConfig";

const MessageBar = ({ socket }) => {
  const { theme } = useTheme();
  const { toast } = useToast();

  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voiceLoading, setLoadingVoice] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [showCapturAudio, setShowCaptureAudio] = useState(false);
  const emojiPickerRef = useRef(null);

  const user = useRecoilValue(userAtom);
  const setMessages = useSetRecoilState(messageAtom);
  const currentChat = useRecoilValue(currentChatAtom);

  const recieverUser = currentChat.chatRoom.participants.find(
    (member) => member._id !== user.userInfo._id
  );

  useEffect(() => {
    setShowCaptureAudio(false);
    setShowEmojiPicker(false);
    setImgURL("");
    setLoading(false);
    setLoadingVoice(false);
    setText("");
  }, [currentChat]);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      const newMessage = await createMessage({
        senderId: user.userInfo._id,
        chatRoomId: currentChat.chatRoom._id,
        text: text,
      });
      socket.emit("send-msg", {
        chatRoomId: currentChat.chatRoom._id,
        message: newMessage,
        recieverUser: recieverUser._id,
      });
      setMessages((prevMsg) => [...prevMsg, newMessage]);
      setText("");
    } catch (error) {
      if (error instanceof Error) {
        return toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const onEmojiClick = ({ emoji }) => {
    setText((prevText) => prevText + emoji);
  };

  const handleClickOutside = (e) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.addEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

  const sendImage = async () => {
    if (!imgURL || loading) return;
    try {
      setLoading(true);
      const newMessage = await sendImageMessage({
        senderId: user.userInfo._id,
        chatRoomId: currentChat.chatRoom._id,
        image: imgURL,
      });
      socket.emit("send-msg", {
        chatRoomId: currentChat.chatRoom._id,
        recieverUser: recieverUser._id,
        message: newMessage,
      });
      setMessages((prevMsg) => [...prevMsg, newMessage]);
      setImgURL("");
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        return toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
      }
    }
  };

  const sendVoiceMessage = async (voiceBlob) => {
    let audioURL = "";
    if (voiceLoading) return;

    try {
      setLoadingVoice(true);
      if (voiceBlob) {
        const randomNumber = Math.floor(Math.random() * 100000);
        const storageRef = ref(
          firebaseStorage,
          `recordings/${currentChat._id}.${randomNumber}.mp3`
        );

        const snapshot = await uploadBytesResumable(storageRef, voiceBlob);
        const downloadURL = await getDownloadURL(storageRef);
        audioURL = downloadURL;
      }

      const newMessage = await sendAudioMessage({
        senderId: user.userInfo._id,
        chatRoomId: currentChat.chatRoom._id,
        audioURL: audioURL,
      });

      socket.emit("send-msg", {
        chatRoomId: currentChat.chatRoom._id,
        recieverUser: recieverUser._id,
        message: newMessage,
      });

      setMessages((prevMsg) => [...prevMsg, newMessage]);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
      }
    } finally {
      setLoadingVoice(false);
    }
  };

  return (
    <div className="w-full h-[8vh] flex items-center gap-1 relative px-4 ">
      {!showCapturAudio && (
        <>
          <div
            className="rounded-full h-12 w-12 flex justify-center items-center cursor-pointer hover:bg-gray-200/30 transition-colors duration-200"
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            <MdOutlineEmojiEmotions className="text-xl" />
          </div>
          <div className="w-full rounded-lg h-14 flex items-center">
            <div className="px-2 w-full h-14">
              <div
                className={`flex gap-4 h-14 items-center border border-bee/10 rounded-xl ${
                  theme === "light" ? "bg-muted/80" : "bg-muted/10"
                }`}
              >
                <div className="w-full ">
                  <input
                    onChange={(e) => handleChange(e)}
                    onKeyDown={handleKeyPress}
                    value={text}
                    placeholder="Type..."
                    className="search-field"
                  ></input>
                </div>
                {text ? (
                  <div
                    onClick={sendMessage}
                    className={`p-2 me-4 ${
                      text && "rounded-full bg-primary"
                    } cursor-pointer`}
                  >
                    <LuSendHorizonal
                      className={`text-xl ${
                        text ? "text-black" : "text-foreground"
                      }`}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center p-2 me-8 gap-5">
                    <SendPhotoDropdown imgURL={imgURL} setImgURL={setImgURL} />
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setShowCaptureAudio(true);
                      }}
                    >
                      <HiOutlineMicrophone className={`text-xl`} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {showEmojiPicker && (
        <div ref={emojiPickerRef} className="absolute bottom-16 left-4">
          <EmojiPicker
            theme={theme === "dark" ? "dark" : "light"}
            onEmojiClick={onEmojiClick}
          />
        </div>
      )}

      {imgURL && (
        <SendPhotoDialog
          imgURL={imgURL}
          setImgURL={setImgURL}
          sendImage={sendImage}
          loading={loading}
        />
      )}
      {showCapturAudio && (
        <CaptureAudio
          setShowCaptureAudio={setShowCaptureAudio}
          sendVoiceMessage={sendVoiceMessage}
          voiceLoading={voiceLoading}
          setVoiceLoading={setLoadingVoice}
        />
      )}
    </div>
  );
};

export default MessageBar;
