import userAtom from "@/atom/userAtom";
import Avatar from "../common/Avatar";
import { useRecoilValue } from "recoil";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BlockedUserTile from "../common/BlockedUserTile";
import { Button } from "@/components/ui/button";
import EditForm from "../common/Forms/EditForm";
import { useEffect, useState } from "react";
import { getBlockedUsers } from "@/lib/actions/user.actions";
import menuAtom from "@/atom/menuAtom";
import { MenuConst } from "@/constants";

const ProfileContent = () => {
  const user = useRecoilValue(userAtom);
  const activeMenu = useRecoilValue(menuAtom);
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const blockedUsersList = await getBlockedUsers(user.userInfo._id);
        return setBlockedUsers(blockedUsersList);
      } catch (error) {}
    };
    if (activeMenu === MenuConst.PROFILE) {
      fetchBlockedUsers();
    }
  }, [activeMenu]);

  return (
    <div className="my-3 md:h-[80dvh] h-[65dvh] overflow-auto">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="border-2 border-bee rounded-full">
            <Avatar imgURL={user.userInfo.avatarURL} size="lg" />
          </div>
          <div className="text-align">
            <p className="text-lg">@{user.userInfo.username}</p>
          </div>
        </div>
        <div className="px-4">
          <p>{user.userInfo.bio}</p>
        </div>
        <div>
          <EditForm
            trigger={<Button className="rounded-xl">Edit Profile</Button>}
          />
        </div>
        <div className="w-full px-3">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h5 className="text-center">Blocked Users</h5>
              </AccordionTrigger>
              <AccordionContent>
                <div className="overflow-auto md:h-[40dvh] h-[25dvh]">
                  {blockedUsers.length > 0 ? (
                    blockedUsers.map((blockUser, index) => (
                      <BlockedUserTile key={index} user={blockUser} />
                    ))
                  ) : (
                    <div>
                      <p>No blocked users 😉</p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
