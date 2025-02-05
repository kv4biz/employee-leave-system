"use client";
import { MoonStar, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const ThemeToogle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full h-[2rem] w-[2rem]"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 dark:rotate-180 dark:scale-0" />
        <MoonStar className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-180 dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  );
};

export default ThemeToogle;
