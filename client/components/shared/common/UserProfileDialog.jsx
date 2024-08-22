import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import Avatar from "./Avatar";
import { Button } from "@/components/ui/button";
import { useRecoilValue } from "recoil";
import userAtom from "@/atom/userAtom";

const UserProfileDialog = ({ user, trigger }) => {
  const currentUser = useRecoilValue(userAtom);
  const isOwnerProfile = currentUser.userInfo._id === user._id;
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader />
        <div className="my-3">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="border-2 border-bee rounded-full">
                <Avatar imgURL={user.avatarURL} size="lg" />
              </div>
              <div className="text-align">
                <p className="text-lg">@{user.username}</p>
              </div>
            </div>
            <div>
              <p>{user.bio}</p>
            </div>
            {!isOwnerProfile && (
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className={`w-28 py-6 border-red-400 hover:bg-red-400 transition-all duration-300 rounded-xl`}
                >
                  Block
                </Button>
                <Button className="w-28 py-6 rounded-xl">Add Contacts</Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
