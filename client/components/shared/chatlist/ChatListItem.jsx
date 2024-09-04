import Avatar from "../common/Avatar";
import MessageStatus from "../common/MessageStatus";
import userAtom from "@/atom/userAtom";
import receiverAtom from "@/atom/receiverAtom";
import currentChatAtom from "@/atom/currentChatAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useToast } from "@/components/ui/use-toast";
import { check_create_room } from "@/lib/actions/chatRoom.actions";
import { calculateTime } from "@/utils/CalculateTime";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { CiImageOn } from "react-icons/ci";

const ChatListItem = ({ chatSummaries }) => {
  const setChatRoom = useSetRecoilState(currentChatAtom);
  const setReceiverUser = useSetRecoilState(receiverAtom);
  const user = useRecoilValue(userAtom);
  const { toast } = useToast();

  const handleChatRoom = async () => {
    try {
      const data = await check_create_room(chatSummaries.receiverUsers[0]._id);

      setChatRoom(data);
      setReceiverUser(chatSummaries.receiverUsers[0]);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div
      className="mx-2 py-3 rounded hover:bg-bee/10 cursor-pointer transition-colors duration-100"
      onClick={handleChatRoom}
    >
      <div>
        <div className="w-full p-2">
          <div className="flex w-full gap-4 justify-between">
            <div className="flex justify-center items-center">
              <Avatar
                size="sm"
                imgURL={chatSummaries.receiverUsers[0].avatarURL}
              />
            </div>
            <div className="flex flex-col justify-center gap-2 w-full">
              <div className="flex justify-between items-center">
                {chatSummaries.receiverUsers[0].username}
                {chatSummaries.lastMessage._id && (
                  <span
                    className={`text-xs
                      ${
                        chatSummaries.unreadMessages > 0
                          ? "text-bee"
                          : "text-foreground"
                      }
                      `}
                  >
                    {calculateTime(chatSummaries.lastMessage.createdAt)}
                  </span>
                )}
              </div>
              <div className="flex w-full gap-1 items-center">
                <div className="md:w-36 w-full">
                  {chatSummaries.lastMessage.messageType === "text" ? (
                    <p className="line-clamp-1 text-sm text-muted-foreground">
                      {chatSummaries.lastMessage.message}
                    </p>
                  ) : (
                    <div className="flex items-center gap-2">
                      {chatSummaries.lastMessage.messageType === "voice" && (
                        <>
                          <HiOutlineMicrophone /> Voice
                        </>
                      )}
                      {chatSummaries.lastMessage.messageType === "image" && (
                        <>
                          <CiImageOn /> Image
                        </>
                      )}
                    </div>
                  )}
                </div>
                {user.userInfo._id === chatSummaries.lastMessage.sender ? (
                  <span className="w-6 h-6 rounded-full flex justify-center items-center">
                    <MessageStatus
                      recipients={chatSummaries.lastMessage.recipientStatuses}
                    />
                  </span>
                ) : (
                  chatSummaries.unreadMessages > 0 && (
                    <span className="w-6 h-6 rounded-full flex justify-center items-center bg-bee">
                      <p className="text-xs text-center">
                        {chatSummaries.unreadMessages}
                      </p>
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
