import { useEffect, useState } from "react";
import ContactsHeader from "./ContactsHeader";
import ContactSearch from "./ContactSearch";
import ContactList from "./ContactList";
import { useRecoilValue } from "recoil";
import { MenuConst } from "@/constants";
import { getAllUsers } from "../../../lib/actions/user.actions";
import menuAtom from "@/atom/menuAtom";
import { Spinner } from "@/components/ui/spinner";

const Contacts = () => {
  const activeMenu = useRecoilValue(menuAtom);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      let users = [];
      try {
        setLoading(true);
        users = await getAllUsers();
      } catch (error) {
        users = [];
        console.error("Failed to fetch chat summaries:", error);
      } finally {
        setLoading(false);
      }
      setContacts(users);
    };

    if (activeMenu === MenuConst.CONTACTS) {
      fetchUsers();
    }
  }, [activeMenu]);

  return (
    <>
      <ContactsHeader />
      {loading ? (
        <div className="h-[70dvh] flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <ContactSearch contacts={contacts} />
          <ContactList users={contacts} />
        </>
      )}
    </>
  );
};

export default Contacts;
