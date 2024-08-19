import { useTheme } from "next-themes";
import { IoIosSearch } from "react-icons/io";

const ContactSearch = () => {
  const { theme } = useTheme();
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
          <input placeholder="Search..." className="search-field"></input>
        </div>
      </div>
    </div>
  );
};

export default ContactSearch;
