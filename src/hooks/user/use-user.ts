"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { userSchema } from "@/schema/user.schema";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

export type UserFormValues = z.infer<typeof userSchema>;

export const useUser = () => {
  const methods = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  const [loading, setLoading] = useState(false);

  const onHandleSubmit = methods.handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create user");
      }
      toast({ title: "Success", description: "User created successfully!" });

      methods.reset();
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Error creating user.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  });

  return { methods, onHandleSubmit, loading };
};
