// view.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRequestActions } from "@/hooks/request/action-request";
import { useUser } from "@/hooks/use-user";
import { Loader } from "@/components/loader";

const ViewRequest = ({ requestId }: { requestId: string }) => {
  const { fetchLeaveRequest } = useRequestActions();
  const { user } = useUser();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequest = async () => {
      try {
        const data = await fetchLeaveRequest(requestId);
        console.log("Fetched leave request data:", data);
        // Set the request directly (not data.request)
        setRequest(data);
      } catch (error) {
        console.error("Error fetching leave request:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [requestId]);

  return (
    <Loader loading={loading}>
      {!request ? (
        <p>Leave request not found</p>
      ) : (
        <div className="flex flex-col gap-4">
          {user?.role === "ADMIN" && (
            <p>
              <strong>Employee ID:</strong> {request.employeeId}
            </p>
          )}
          {user?.role === "ADMIN" && (
            <p>
              <strong>Employee Name:</strong>{" "}
              {request.employee?.fullName || "N/A"}
            </p>
          )}
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(request.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {new Date(request.endDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Reason:</strong> {request.reason}
          </p>
          <p>
            <strong>Status:</strong> {request.status}
          </p>
          <p>
            <strong>Approved By:</strong> {request.approvedBy || "Pending"}
          </p>
        </div>
      )}
    </Loader>
  );
};

export default ViewRequest;
