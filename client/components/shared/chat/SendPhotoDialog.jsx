import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
const SendPhotoDialog = ({ sendImage, imgURL, setImgURL, loading }) => {
  const handleClick = () => {
    sendImage();
  };
  return (
    <Dialog open={imgURL}>
      <DialogContent className="sm:max-w-md" closeButton={false}>
        <DialogHeader />
        <div className="flex justify-center items-center h-full w-full rounded-xl">
          <Image
            src={imgURL ? imgURL : "/avatar.png"}
            alt="sending_photo"
            className="rounded-xl object-cover object-center "
            width={"300"}
            height={"300"}
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex items-center justify-center gap-5">
            <Button
              variant="outline"
              disabled={loading}
              className={`w-14 h-14 border-red-400 hover:bg-red-400 rounded-full transition-all duration-300`}
              onClick={() => {
                setImgURL("");
              }}
            >
              <MdDeleteOutline className={`text-xl`} />
            </Button>
            <Button
              disabled={loading}
              className={`w-14 h-14 rounded-full cursor-pointer`}
              onClick={handleClick}
            >
              <LuSendHorizonal className={`text-xl text-black`} />
            </Button>
          </div>
          <div className="text-center h-8">
            {loading && <p className="animate-bounce">Sending...</p>}
          </div>
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};

export default SendPhotoDialog;
