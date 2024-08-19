import React, { useState } from "react";
import ContactsHeader from "./ContactsHeader";
import ContactSearch from "./ContactSearch";
import ContactList from "./ContactList";
import { useRecoilValue } from "recoil";
import { MenuConst } from "@/constants";
import { getAllUsers } from "../../../lib/actions/user.actions";
import menuAtom from "@/atom/menuAtom";

const Contacts = () => {
  const activeMenu = useRecoilValue(menuAtom);
  const [contacts, setContacts] = useState([]);

  useState(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      return setContacts(users);
    };

    if (activeMenu === MenuConst.CONTACTS) {
      fetchUsers();
    }
  }, [activeMenu]);
  return (
    <>
      <ContactsHeader />
      <ContactSearch />
      <ContactList users={contacts} />
    </>
  );
};

export default Contacts;
