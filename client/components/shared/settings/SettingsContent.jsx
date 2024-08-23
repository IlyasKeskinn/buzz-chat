import userAtom from "@/atom/userAtom";
import Avatar from "../common/Avatar";
import { useRecoilValue } from "recoil";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ThemeButton from "../theme/ThemeButton";

const SettingsContent = () => {
  const user = useRecoilValue(userAtom);
  return (
    <div className="p-5">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="border-2 border-bee rounded-full">
            <Avatar imgURL={user.userInfo.avatarURL} size="lg" />
          </div>
          <div className="text-align">
            <p className="text-lg">@{user.userInfo.username}</p>
          </div>
        </div>
        <div>
          <p>{user.userInfo.bio}</p>
        </div>
        <div className="w-full px-3">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Privacy</AccordionTrigger>
              <AccordionContent>Comming Soon!</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Apps</AccordionTrigger>
              <AccordionContent>
                <div className="w-full">
                  <div className="flex flex-col gap-4 py-5">
                    <div className="flex items-center justify-between space-x-2">
                      <Label>Theme</Label>
                      <ThemeButton />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="notification_sound">
                        Notification sound
                      </Label>
                      <Switch id="notification_sound" />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Help</AccordionTrigger>
              <AccordionContent>Comming Soon!</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
