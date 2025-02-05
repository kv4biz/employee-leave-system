//request-action-overlay.tsx
"use client";

import ViewRequest from "./view";
import UpdateRequestStatus from "./status";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

type RequestActionOverlayProps = {
  isOpen: boolean;
  action: "view" | "changeStatus" | null;
  requestId: string | null;
  onClose: () => void;
  refreshTable: () => void;
};

const RequestActionOverlay: React.FC<RequestActionOverlayProps> = ({
  isOpen,
  action,
  requestId,
  onClose,
  refreshTable,
}) => {
  if (!action || !requestId) return null;
  console.log("Opening action for leave request ID:", requestId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "view" ? "View Leave Request" : "Update Leave Status"}
          </DialogTitle>
        </DialogHeader>
        {action === "view" && <ViewRequest requestId={requestId} />}
        {action === "changeStatus" && (
          <UpdateRequestStatus
            requestId={requestId}
            onSuccess={onClose}
            refreshTable={refreshTable}
          />
        )}
        <DialogClose asChild></DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default RequestActionOverlay;
