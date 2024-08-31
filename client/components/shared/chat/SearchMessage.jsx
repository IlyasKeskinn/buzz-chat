import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

import messageAtom from "@/atom/messageaAtom";
import userAtom from "@/atom/userAtom";
import FoundedMessage from "../common/FoundedMessage";
const SearchMessage = ({ child }) => {
  const messages = useRecoilValue(messageAtom);
  const { theme } = useTheme();
  const user = useRecoilValue(userAtom);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sheetCloseRef = useRef(null);

  useEffect(() => {
    if (searchTerm && searchTerm.length >= 3) {
      setFilteredMessages(
        messages.filter(
          (message) =>
            message.messageType == "text" &&
            message.message.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredMessages([]);
    }
  }, [searchTerm]);

  const scrollToMessage = (message) => {
    const messageElement = document.getElementById(message._id);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Message element not found in DOM:", message._id);
    }

    if (sheetCloseRef.current) {
      sheetCloseRef.current.click();
    }
  };

  useEffect(() => {
    if (!isSheetOpen) {
      setFilteredMessages([]);
      setSearchTerm("");
    }
  }, [isSheetOpen]);
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>{child}</SheetTrigger>
      <SheetContent closeButton={false}>
        <SheetHeader>
          <div className="w-full rounded-lg h-14 flex items-center">
            <div className="w-full h-14">
              <div
                className={`flex gap-4 h-14 items-center border border-bee/10 rounded-xl ${
                  theme === "light" ? "bg-muted/80" : "bg-muted/10"
                }`}
              >
                <div className="w-full ">
                  <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search a message"
                    className="search-field"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </SheetHeader>
        <div className="h-[85%] overflow-auto mb-4">
          {searchTerm.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <p className="text-center">
                Type something to search for a message
              </p>
            </div>
          )}
          {searchTerm.length >= 3 &&
            filteredMessages.length > 0 &&
            filteredMessages.map((msg, index) => (
              <div
                className="cursor-pointer"
                onClick={() => scrollToMessage(msg)}
              >
                <FoundedMessage key={index} user={user} message={msg} />
              </div>
            ))}

          {searchTerm.length >= 3 && !filteredMessages.length > 0 && (
            <div className="h-full flex items-center justify-center">
              <p>Message no found!</p>
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild ref={sheetCloseRef}>
            <Button type="button">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SearchMessage;
