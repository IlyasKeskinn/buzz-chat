import React from "react";
import ContactItem from "./ContactItem";
import { useRecoilValue } from "recoil";
import filteredContactsAtom from "@/atom/filteredContacts";

const ContactList = ({ users }) => {
  const filteredContacts = useRecoilValue(filteredContactsAtom);
  return (
    <div className="overflow-auto md:h-[80dvh] h-[65dvh]">
      {users.length > 0 ? (
        filteredContacts.length > 0 ? (
          filteredContacts.map((user) => (
            <ContactItem key={user._id} user={user} />
          ))
        ) : (
          users.map((user) => <ContactItem key={user._id} user={user} />)
        )
      ) : (
        <div className="p-5">You have no connections!</div>
      )}
    </div>
  );
};

export default ContactList;
