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

const ProfileContent = () => {
  const user = useRecoilValue(userAtom);

  return (
    <div className="my-3 md:h-[80vh] h-[65vh]">
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
                <div className="overflow-auto md:h-[40vh] h-[25vh]">
                  <BlockedUserTile user={user.userInfo} />
                  <BlockedUserTile user={user.userInfo} />
                  <BlockedUserTile user={user.userInfo} />
                  <BlockedUserTile user={user.userInfo} />
                  <BlockedUserTile user={user.userInfo} />
                  <BlockedUserTile user={user.userInfo} />
                  <BlockedUserTile user={user.userInfo} />
                  <BlockedUserTile user={user.userInfo} />
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
