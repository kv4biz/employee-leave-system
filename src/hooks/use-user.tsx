"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type User = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  profilePic?: string | null;
  createdAt: string;
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!authToken) {
        setUser(null);
        return;
      }

      try {
        const decodedToken = jwtDecode<{ id: string }>(authToken);
        const response = await fetch(`/api/users/${decodedToken.id}`);
        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return { user };
};
