// hooks/use-logout.ts
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "./use-toast";

export const useLogout = () => {
  const router = useRouter();

  const logout = async (userId: string) => {
    try {
      await axios.post("/api/auth/logout", { userId });

      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      router.push("/login");
      toast({
        title: "Success",
        description: "Logout successful!",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return { logout };
};
