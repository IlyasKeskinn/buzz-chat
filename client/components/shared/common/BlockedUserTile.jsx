import React from "react";
import Avatar from "./Avatar";
import { Button } from "@/components/ui/button";

const BlockedUserTile = ({ user }) => {
  return (
    <div className="w-full py-3 rounded hover:bg-bee/10 ctransition-colors duration-100">
      <div>
        <div className="w-full py-2">
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
                  <Button variant="destructive" className="rounded-xl w-20">Block</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedUserTile;
