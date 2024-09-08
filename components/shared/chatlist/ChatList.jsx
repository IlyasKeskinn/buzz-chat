import ChatListItem from "./ChatListItem";
import { useRecoilValue } from "recoil";
import filteredChatListAtom from "@/atom/filteredChatList";

const ChatList = ({ chatList }) => {
  const filteredChatList = useRecoilValue(filteredChatListAtom);

  return (
    <div className="overflow-auto md:h-[80dvh] h-[65dvh]">
      {chatList.length > 0 ? (
        filteredChatList.length > 0 ? (
          filteredChatList.map((chatItem, index) => {
            return <ChatListItem key={index} chatSummaries={chatItem} />;
          })
        ) : (
          chatList.map((chatItem, index) => {
            return <ChatListItem key={index} chatSummaries={chatItem} />;
          })
        )
      ) : (
        <div className="p-5">
          You don't have any chat history, start a new chat.
        </div>
      )}
    </div>
  );
};

export default ChatList;
