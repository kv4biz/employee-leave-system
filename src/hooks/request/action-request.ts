// hooks/request/action-request.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

type Employee = {
  id: string;
  fullName: string;
  email: string;
  profilePic?: string;
};

export type LeaveRequest = {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
};

export const useRequestActions = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      setIsLoading(true);
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];

        console.log("Fetched authToken from cookie:", token);

        if (!token) throw new Error("Authentication token missing");

        const response = await axios.get("/api/leave-requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let requests: LeaveRequest[] | undefined;
        if (Array.isArray(response.data)) {
          requests = response.data;
        } else if (response.data && Array.isArray(response.data.requests)) {
          requests = response.data.requests;
        }

        if (!requests) {
          throw new Error("Invalid response format");
        }

        setLeaveRequests(requests);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Error fetching leave requests.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequest = async (id: string) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Authentication token missing");

      const { data } = await axios.get(`/api/leave-requests/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching leave request:", error);
      throw error;
    }
  };

  const updateLeaveRequest = async (
    id: string,
    status: "PENDING" | "APPROVED" | "REJECTED"
  ) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Authentication token missing");

      await axios.patch(
        `/api/leave-requests/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLeaveRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
      toast({
        title: "Success",
        description: "Leave request updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update leave request",
        variant: "destructive",
      });
    }
  };

  return { leaveRequests, isLoading, fetchLeaveRequest, updateLeaveRequest };
};
