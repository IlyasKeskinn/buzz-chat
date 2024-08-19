import React from "react";
import ContactItem from "./ContactItem";

const ContactList = ({ users }) => {
  return (
    <div className="overflow-auto md:h-[80vh] h-[65vh]">
      {users.map((user) => (
        <ContactItem key={user._id}  user={user}/>
      ))}
    </div>
  );
};

export default ContactList;
