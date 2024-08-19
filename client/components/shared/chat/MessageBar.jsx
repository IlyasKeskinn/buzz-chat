import { MdOutlineEmojiEmotions } from "react-icons/md";
import { ImAttachment } from "react-icons/im";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { LuSendHorizonal } from "react-icons/lu";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { createMessage } from "@/lib/actions/messages.actions";
import { useToast } from "@/components/ui/use-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import EmojiPicker from "emoji-picker-react";
import userAtom from "@/atom/userAtom";
import currentChatAtom from "@/atom/currentChatAtom";
import messageAtom from "@/atom/messageaAtom";

const MessageBar = ({ socket }) => {
  const { theme } = useTheme();
  const [text, setText] = useState("");
  const { toast } = useToast();
  const user = useRecoilValue(userAtom);
  const setMessages = useSetRecoilState(messageAtom);
  const currentChat = useRecoilValue(currentChatAtom);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const recieverUser = currentChat.participants.find(
    (member) => member._id !== user.userInfo._id
  );

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      const newMessage = await createMessage({
        senderId: user.userInfo._id,
        chatRoomId: currentChat._id,
        text: text,
      });
      socket.emit("send-msg", {
        chatRoomId: currentChat._id,
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

  return (
    <div className="w-full h-[8vh] flex items-center gap-4 relative px-5 ">
      <>
        <div className="flex gap-6 ">
          <MdOutlineEmojiEmotions
            className="text-xl cursor-pointer"
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
            }}
          />
          <ImAttachment className="text-xl cursor-pointer" />
        </div>
        <div className="w-full rounded-lg h-10 flex items-center">
          <div className="px-4 w-full">
            <div
              className={`flex gap-4 items-center border border-bee/10 rounded-xl ${
                theme === "light" ? "bg-muted/80" : "bg-muted/10"
              }`}
            >
              <div className="px-4 w-6">
                <IoIosSearch />
              </div>
              <div className="w-full">
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
                  className={`p-2 me-8 ${
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
                <div
                  className={`p-2 me-8 ${
                    text && "rounded-full bg-primary"
                  } cursor-pointer`}
                >
                  <HiOutlineMicrophone
                    className={`text-xl ${
                      text ? "text-black" : "text-foreground"
                    }`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {showEmojiPicker && (
          <div ref={emojiPickerRef} className="absolute bottom-16 left-4">
            <EmojiPicker
              theme={theme === "dark" ? "dark" : "light"}
              onEmojiClick={onEmojiClick}
            />
          </div>
        )}
      </>
    </div>
  );
};

export default MessageBar;
