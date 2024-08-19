import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";
const Chat = ({ socket }) => {
  return (
    <>
      <div className="md:block  md:order-3 border-l border-b border-b-bee bg-background  max-w-[100%] w-full md:max-h-[100%] h-[100vh] ">
        <div>
          <ChatHeader />
          <ChatContainer />
          <MessageBar socket={socket} />
        </div>
      </div>
    </>
  );
};

export default Chat;
