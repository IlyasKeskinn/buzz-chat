import { Button } from "@/components/ui/button";
import { TiUserAddOutline } from "react-icons/ti";
import { check_create_room } from "@/lib/actions/chatRoom.actions";
import Avatar from "../common/Avatar";
import { useRecoilState } from "recoil";
import { useToast } from "@/components/ui/use-toast";
import currentChatAtom from "@/atom/currentChatAtom";
import receiverAtom from "@/atom/receiverAtom";
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
    <div
      onClick={handleChatRoom}
      className="mx-2 py-3 rounded hover:bg-bee/10 cursor-pointer transition-colors duration-100"
    >
      <div>
        <div className="w-full p-4">
          <div className="flex w-full gap-4 justify-between">
            <div className="flex justify-center items-center">
              <Avatar size="sm" imgURL={user.avatarURL} />
            </div>
            <div className="flex flex-col justify-center gap-2 w-full">
              <div className="flex justify-between items-center">
                <p className="text-base">
                  {user.username.charAt(0).toUpperCase() +
                    user.username.slice(1).toLowerCase()}
                </p>
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
    </div>
  );
};

export default ContactItem;
