"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { requestSchema, RequestFormValues } from "@/schema/request.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export const useRequest = () => {
  const methods = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      dateRange: { from: null, to: null },
      reason: "",
    },
  });

  const { handleSubmit, reset } = methods;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getAuthToken = () => {
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1] || null
    );
  };

  const onHandleSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      if (!data.dateRange.from || !data.dateRange.to) {
        throw new Error("Please select both start and end dates.");
      }

      const token = getAuthToken(); // ✅ Get token from cookies
      if (!token) {
        throw new Error("Authentication token is missing. Please log in.");
      }

      const requestBody = {
        startDate: data.dateRange.from.toISOString(),
        endDate: data.dateRange.to.toISOString(),
        reason: data.reason.trim(),
      };

      const response = await fetch("/api/leave-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit request");
      }

      reset();
      router.refresh();
      toast({ title: "Success", description: "Leave request submitted!" });
    } catch (error) {
      console.error("Request submission error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  });

  return { methods, onHandleSubmit, loading };
};
