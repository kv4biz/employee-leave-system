"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

type ChangePasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const useChangePassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onHandleSubmit = methods.handleSubmit(async (data) => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("authToken="))
              ?.split("=")[1]
          }`,
        },
        body: JSON.stringify(data),
      });

      setLoading(false);
      if (response.ok) {
        toast({
          title: "Success",
          description: "Password changed successfully!",
        });
        router.push("/dashboard");
      } else {
        const { error } = await response.json();
        if (Array.isArray(error)) {
          error.forEach((err: { path: string; message: string }) => {
            methods.setError(err.path as keyof ChangePasswordFormData, {
              message: err.message,
            });
          });
        } else {
          toast({
            title: "Error",
            description: error || "Failed to change password",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Change password error:", error);
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  });

  return { methods, onHandleSubmit, loading };
};
