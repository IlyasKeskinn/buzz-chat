import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";
import { useRecoilValue } from "recoil";
import currentChatAtom from "@/atom/currentChatAtom";
const Chat = ({ socket }) => {
  const currentChat = useRecoilValue(currentChatAtom);
  return (
    <>
      <div className="md:block  md:order-3 border-l border-b border-b-bee bg-background  max-w-[100%] w-full md:max-h-[100%] h-[100vh] ">
        <div>
          <ChatHeader />
          <ChatContainer socket={socket} />
          {!currentChat.blocked ? (
            <MessageBar socket={socket} />
          ) : (
            <div className="flex justify-center items-center">
              <p className="text-bee">
                You can no longer send messages to this person.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
