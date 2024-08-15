import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <div className="p-4 my-5">
      <div className="flex gap-4 items-center border border-bee/10 bg-secondary/30 rounded-xl">
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

export default SearchBar;
