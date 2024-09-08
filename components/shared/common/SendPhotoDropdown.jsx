import usePrevImg from "@/hooks/usePrevImg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useRef, useState } from "react";
import { CiCamera, CiImageOn } from "react-icons/ci";
import CapturePhoto from "../photo/CapturePhoto";

export const SendPhotoDropdown = ({ imgURL, setImgURL }) => {
  const imageRef = useRef(null);
  const { handleImageChange } = usePrevImg(imgURL, setImgURL);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <CiImageOn className={`text-xl`} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl bg-secondary/90 p-5 shadow-md w-52">
        <div>
          <div
            className="flex justify-center items-center text-sm gap-2 hover:bg-gray-500/10 rounded-xl p-4 cursor-pointer"
            onClick={() => {
              imageRef.current.click();
            }}
          >
            <CiImageOn className="text-sm" />
            <span>Choose photo</span>
          </div>
          <input
            type="file"
            ref={imageRef}
            className="hidden"
            onChange={handleImageChange}
          />
          <div
            className="flex justify-center items-center text-sm gap-2 hover:bg-gray-500/10 rounded-xl p-4 cursor-pointer"
            onClick={handleOpen}
          >
            <CiCamera className="text-sm" />
            <span>Take photo</span>
          </div>
        </div>
        <CapturePhoto open={open} setOpen={setOpen} setImgURL={setImgURL} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
