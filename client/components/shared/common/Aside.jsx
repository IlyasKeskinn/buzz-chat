import React from "react";
import Chat from "../chat/Chat";

const Aside = () => {
  return (
    <aside className="md:order-2 order-1 md:max-w-[300px] max-w-[100%] w-full md:max-h-[100%] h-[100%] bg-secondary/50 shadow-lg">
      <Chat />
    </aside>
  );
};

export default Aside;
