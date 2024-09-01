import { Button } from "@/components/ui/button";
import { TiUserAddOutline } from "react-icons/ti";
import { check_create_room } from "@/lib/actions/chatRoom.actions";
import Avatar from "../common/Avatar";
import { useRecoilState } from "recoil";
import { useToast } from "@/components/ui/use-toast";
import currentChatAtom from "@/atom/currentChatAtom";
import receiverAtom from "@/atom/receiverAtom";
import UserProfileDialog from "../common/UserProfileDialog";
const ContactItem = ({ user }) => {
  const [chatRoom, setChatRoom] = useRecoilState(currentChatAtom);
  const [receiver, setReceiverUser] = useRecoilState(receiverAtom);

  const { toast } = useToast();
  const handleChatRoom = async () => {
    try {
      const room = await check_create_room(user?._id);
      setChatRoom(room);
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
                  <div className="flex justify-center items-center">
                    <Avatar size="sm" imgURL={user.avatarURL} />
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

              <div>
                <Button className="rounded-xl">
                  <TiUserAddOutline />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
