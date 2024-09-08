import React, { useCallback } from "react";
import { cn } from "@/lib/utils";

const MenuItem = ({ children, MenuName, activeMenu, setActiveMenu }) => {
  const isActive = activeMenu === MenuName;

  const handleClick = useCallback(() => {
    setActiveMenu(MenuName);
  }, [MenuName, setActiveMenu]);

  return (
    <div
      className={cn(
        "p-5 rounded-xl flex justify-center items-center cursor-pointer transition-all duration-200",
        {
          "bg-primary text-primary-foreground": isActive,
          "hover:bg-muted hover:text-muted-foreground": !isActive,
        }
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default MenuItem;
