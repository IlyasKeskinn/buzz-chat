import filteredContactsAtom from "@/atom/filteredContacts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useSetRecoilState } from "recoil";

const ContactSearch = ({ contacts }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const setFilteredContacts = useSetRecoilState(filteredContactsAtom);

  useEffect(() => {
    let filteredList = [];
    if (searchTerm.length > 0) {
      filteredList = contacts.filter((user) => {
        return user.username.toLowerCase().includes(searchTerm.toLowerCase());
      });
    } else {
      filteredList = [];
    }
    setFilteredContacts(filteredList);
  }, [searchTerm, contacts, setFilteredContacts]);

  return (
    <div className="p-4">
      <div
        className={`flex gap-4 items-center border border-bee/10 rounded-xl ${
          theme === "light" ? "bg-muted/80" : "bg-muted/10"
        }`}
      >
        <div className="px-4 w-6">
          <IoIosSearch />
        </div>
        <div className="">
          <input
            placeholder="Search..."
            className="search-field"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default ContactSearch;
