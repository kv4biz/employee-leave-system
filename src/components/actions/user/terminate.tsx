//terminate.tsx
import React, { useEffect, useState } from "react";
import { useUserActions } from "@/hooks/user/action-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/loader";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

const TerminateUser = ({
  userId,
  onClose,
  refreshTable,
}: {
  userId: string;
  onClose: () => void;
  refreshTable: () => void;
}) => {
  const { fetchUser, terminateUser } = useUserActions();
  const [user, setUser] = useState<any>(null);
  const [confirmFullName, setConfirmFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const data = await fetchUser(userId);
      console.log("Fetched user data:", data);
      setUser(data.user);
      setLoading(false);
    };
    loadUser();
  }, [userId]);

  const handleTerminate = async () => {
    if (confirmFullName === user?.fullName) {
      setProcessing(true);
      await terminateUser(userId);
      setProcessing(false);
      refreshTable();
      onClose();
    }
  };

  return (
    <Loader loading={loading}>
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Termination</AlertDialogTitle>
            <AlertDialogDescription>
              To terminate this employee, type{" "}
              <span className="font-extrabold">{user?.fullName}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            value={confirmFullName}
            onChange={(e) => setConfirmFullName(e.target.value)}
            placeholder="Enter full name"
          />
          <AlertDialogFooter>
            <Button
              variant="destructive"
              onClick={handleTerminate}
              disabled={confirmFullName !== user?.fullName || processing}
            >
              {processing ? "Processing..." : "Confirm Termination"}
            </Button>
            <Button variant="secondary" onClick={onClose} disabled={processing}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Loader>
  );
};

export default TerminateUser;
