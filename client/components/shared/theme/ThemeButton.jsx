"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { LuMoon } from "react-icons/lu";
import { GoSun } from "react-icons/go";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <div className="rounded-xl py-6 px-5"  onClick={handleTheme}>
      {theme === "light" ? <LuMoon className="text-card-foreground text-2xl" /> : <GoSun className="text-card-foreground text-2xl" />}
    </div>
  );
};

export default ThemeButton;
