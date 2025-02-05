//user-action-overlay.tsx
import ViewUser from "./view";
import UpdateUser from "./update";
import TerminateUser from "./terminate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

type UserActionOverlayProps = {
  isOpen: boolean;
  action: "view" | "update" | "terminate" | null;
  userId: string | null;
  onClose: () => void;
  refreshTable: () => void;
};

const UserActionOverlay: React.FC<UserActionOverlayProps> = ({
  isOpen,
  action,
  userId,
  onClose,
  refreshTable,
}) => {
  if (!action || !userId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "view"
              ? "View User"
              : action === "update"
              ? "Update User"
              : "Terminate User"}
          </DialogTitle>
        </DialogHeader>
        {action === "view" && <ViewUser userId={userId} />}
        {action === "update" && (
          <UpdateUser
            userId={userId}
            onSuccess={onClose}
            refreshTable={refreshTable}
          />
        )}{" "}
        {action === "terminate" && (
          <TerminateUser
            userId={userId}
            onClose={onClose}
            refreshTable={refreshTable}
          />
        )}
        <DialogClose asChild></DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default UserActionOverlay;
