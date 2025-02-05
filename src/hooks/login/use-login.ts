"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

type LoginFormData = {
  username: string;
  password: string;
};

export const useLoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onHandleSubmit = methods.handleSubmit(async (data) => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setLoading(false);
      if (response.ok) {
        const { token } = await response.json();
        document.cookie = `authToken=${token}; path=/`;
        toast({
          title: "Success",
          description: "Login successful!",
        });
        router.push("/dashboard");
      } else {
        const { error } = await response.json();
        error.forEach((err: { path: string; message: string }) => {
          methods.setError(err.path as keyof LoginFormData, {
            message: err.message,
          });
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  });

  return { methods, onHandleSubmit, loading };
};
