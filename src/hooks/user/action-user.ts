//hooks/user/action-user.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
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

export const useUserActions = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsUsersLoading(true);
      try {
        const response = await axios.get("/api/users");
        if (!response.data || !Array.isArray(response.data.users)) {
          throw new Error("Invalid response format");
        }
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Error fetching users.",
          variant: "destructive",
        });
      } finally {
        setIsUsersLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const fetchUser = async (id: string) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const updateUser = async (user: {
    id: string;
    fullName: string;
    username: string;
    email: string;
  }) => {
    try {
      await axios.patch(`/api/users/${user.id}`, user);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, ...user } : u))
      );
      toast({ title: "Success", description: "User updated successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
    }
  };

  const terminateUser = async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast({ title: "Success", description: "User terminated successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to terminate user",
        variant: "destructive",
      });
    }
  };

  return { users, isUsersLoading, fetchUser, updateUser, terminateUser };
};
