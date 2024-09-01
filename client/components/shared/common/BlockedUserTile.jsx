import React from "react";
import Avatar from "./Avatar";
import { Button } from "@/components/ui/button";
import useBlockUnblock from "@/hooks/useBlockUnblock";

const BlockedUserTile = ({ user }) => {
  const { isBlockUser, handleBlockUser } = useBlockUnblock(user);

  return (
    <div className="w-full py-3">
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
                  <Button
                    variant="destructive"
                    className="rounded-xl w-20"
                    onClick={handleBlockUser}
                  >
                    {isBlockUser ? "Unblock" : "Block"}
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

export default BlockedUserTile;
