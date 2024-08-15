import React from "react";
import Avatar from "../common/Avatar";
import { LuCheck } from "react-icons/lu";
import { LuCheckCheck } from "react-icons/lu";

const ChatListItem = () => {
  return (
    <div className="mx-2 py-3 rounded hover:bg-bee/10 cursor-pointer transition-colors duration-100">
      <div>
        <div className="w-full p-4">
          <div className="flex w-full gap-4 justify-between">
            <div className="flex justify-center items-center">
              <Avatar size="sm" />
            </div>
            <div className="flex flex-col justify-center gap-2 w-full">
              <div className="flex justify-between items-center">
                <p className="text-base">Fidelio</p>
                <p className="text-xs">4 days ago</p>
              </div>
              <div className="flex w-full gap-1 items-center">
                <div>
                  <LuCheck className={`text-sm`} />
                </div>
                <div className="md:w-36 w-full">
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    Lorem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
