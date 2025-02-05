import { ReactNode } from "react";
import ThemeToggle from "@/components/ThemeToggle";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="hidden lg:flex w-1/2 bg-primary items-center justify-center">
        <ThemeToggle />
      </div>
      {/* Right side */}
      <div className="w-full lg:w-1/2 flex flex-col lg:flex-row justify-center items-center px-10 py-20">
        <div className="block lg:hidden">
          <ThemeToggle />
        </div>
        {children}
      </div>
    </div>
  );
}
