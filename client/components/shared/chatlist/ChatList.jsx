import ChatListItem from "./ChatListItem";
import { useRecoilValue } from "recoil";
import filteredChatListAtom from "@/atom/filteredChatList";

const ChatList = ({chatList}) => {
  const filteredChatList = useRecoilValue(filteredChatListAtom);

  return (
    <div className="overflow-auto md:h-[80vh] h-[65vh]">
      {filteredChatList.length > 0
        ? filteredChatList.map((chatItem, index) => {
            return <ChatListItem key={index} chatSummaries={chatItem} />;
          })
        : chatList.map((chatItem, index) => {
            return <ChatListItem key={index} chatSummaries={chatItem} />;
          })}
    </div>
  );
};

export default ChatList;
