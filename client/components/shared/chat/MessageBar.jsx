import { MdOutlineEmojiEmotions } from "react-icons/md";
import { ImAttachment } from "react-icons/im";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { LuSendHorizonal } from "react-icons/lu";
import { useTheme } from "next-themes";

const MessageBar = () => {
  const { theme } = useTheme();

  const isTyping = false;
  return (
    <div className="w-full h-[8vh] flex items-center gap-4 relative px-5">
      <>
        <div className="flex gap-6 ">
          <MdOutlineEmojiEmotions className="text-xl cursor-pointer" />
          <ImAttachment className="text-xl cursor-pointer" />
        </div>
        <div className="w-full rounded-lg h-10 flex items-center">
          <div className="p-4 w-full">
            <div
              className={`flex gap-4 items-center border border-bee/10 rounded-xl ${
                theme === "light" ? "bg-muted/80" : "bg-muted/10"
              }`}
            >
              <div className="px-4 w-6">
                <IoIosSearch />
              </div>
              <div className="w-full">
                <input placeholder="Type..." className="search-field"></input>
              </div>
              <div
                className={`p-2 me-8 ${
                  isTyping && "rounded-full bg-primary"
                } cursor-pointer`}
              >
                {isTyping ? (
                  <LuSendHorizonal
                    className={`text-xl ${
                      isTyping ? "text-black" : "text-foreground"
                    }`}
                  />
                ) : (
                  <HiOutlineMicrophone
                    className={`text-xl ${
                      isTyping ? "text-black" : "text-foreground"
                    }`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default MessageBar;
