"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useRef, useState } from "react";

import usePrevImg from "@/hooks/usePrevImg";
import Image from "next/image";
import CapturePhoto from "./CapturePhoto";
const AvatarEdit = ({ imgURL, setImgURL }) => {
  const imageRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { handleImageChange } = usePrevImg(imgURL, setImgURL);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      );
      setIsMobileDevice(isMobile);
    }
  }, []);

  const handleOpen = () => setOpen(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-end p-4">
          <div className="w-32 h-32 rounded-full bg-slate-600 relative group cursor-pointer">
            <div className="w-32 h-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Image
                src={imgURL ? imgURL : "/avatar.png"}
                width="128"
                height="128"
                alt="avatar"
                className="h-32 w-32 object-cover object-center rounded-full"
              />
            </div>
            <div className="absolute rounded-full inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Chose a photo
            </div>
          </div>
          <input
            type="file"
            ref={imageRef}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="px-2 py-4 text-lg">
          Set Avatar
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div
          onClick={() => {
            imageRef.current.click();
          }}
          className="px-2 py-5 my-4 text-base rounded-xl hover:bg-bee/30 cursor-pointer"
        >
          Choose from library
        </div>
        {!isMobileDevice && (
          <div
            onClick={handleOpen}
            className="px-2 py-5 my-4 text-base rounded-xl hover:bg-bee/30 cursor-pointer"
          >
            Take photo
          </div>
        )}
        <CapturePhoto open={open} setOpen={setOpen} setImgURL={setImgURL} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarEdit;
