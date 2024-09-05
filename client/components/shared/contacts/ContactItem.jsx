import { check_create_room } from "@/lib/actions/chatRoom.actions";
import Avatar from "../common/Avatar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useToast } from "@/components/ui/use-toast";
import currentChatAtom from "@/atom/currentChatAtom";
import receiverAtom from "@/atom/receiverAtom";
import UserProfileDialog from "../common/UserProfileDialog";
import onlineUsersAtom from "@/atom/onlineUsersAtom";
const ContactItem = ({ user }) => {
  const setChatRoom = useSetRecoilState(currentChatAtom);
  const setReceiverUser = useSetRecoilState(receiverAtom);
  const onlineUsers = useRecoilValue(onlineUsersAtom);

  const { toast } = useToast();
  const handleChatRoom = async () => {
    try {
      const data = await check_create_room(user?._id);

      setChatRoom(data);
      setReceiverUser(user);
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
    <div className="rounded-xl hover:bg-bee/10 transition-colors duration-150 my-5 mx-2 ps-2 p-2">
      <div className="w-full">
        <div className="">
          <div className="flex items-center justify-between gap-2">
            <div>
              <UserProfileDialog
                user={user}
                trigger={
                  <div className="flex justify-center items-center rounded-full relative">
                    <Avatar size="sm" imgURL={user.avatarURL} />
                    <div
                      className={`absolute top-1 left-1 w-2 h-2 rounded-full border ${
                        onlineUsers.includes(user._id)
                          ? "bg-green-400 shadow "
                          : "hidden"
                      }`}
                    ></div>
                  </div>
                }
              />
            </div>
            <div className="w-full flex justify-between">
              <div
                className="cursor-pointer flex items-center flex-1"
                onClick={handleChatRoom}
              >
                <p className="text-base">
                  {user.username.charAt(0).toUpperCase() +
                    user.username.slice(1).toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
