"use client";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

type User = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  profilePic: string;
  createdAt: string;
};

const useGetUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Error creating user.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
};

export default useGetUsers;
