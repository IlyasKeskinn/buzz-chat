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
    <Button className="rounded-xl py-5 px-7"  onClick={handleTheme}>
      {theme === "light" ? <LuMoon /> : <GoSun />}
    </Button>
  );
};

export default ThemeButton;
