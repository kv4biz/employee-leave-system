//status.tsx
"use client";

import React, { useState } from "react";
import { useRequestActions } from "@/hooks/request/action-request";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";

const UpdateRequestStatus = ({
  requestId,
  onSuccess,
  refreshTable,
}: {
  requestId: string;
  onSuccess: () => void;
  refreshTable: () => void;
}) => {
  const { updateLeaveRequest } = useRequestActions();
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (status: "APPROVED" | "REJECTED") => {
    setLoading(true);
    try {
      await updateLeaveRequest(requestId, status);
      refreshTable();
      onSuccess();
    } catch (error) {
      console.error("Error updating leave request status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Loader loading={loading}>
        <p className="text-lg font-semibold">Update Leave Status</p>
        <p></p>
        <div className="flex gap-4">
          <Button
            onClick={() => handleUpdateStatus("APPROVED")}
            className="bg-green-500"
          >
            Approve
          </Button>
          <Button
            onClick={() => handleUpdateStatus("REJECTED")}
            className="bg-red-500"
          >
            Decline
          </Button>
        </div>
      </Loader>
    </div>
  );
};

export default UpdateRequestStatus;
