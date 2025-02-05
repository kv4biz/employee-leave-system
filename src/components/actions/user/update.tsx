//update.tsx
import React, { useEffect, useState } from "react";
import { useUserActions } from "@/hooks/user/action-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/loader";

const UpdateUser = ({
  userId,
  onSuccess,
  refreshTable,
}: {
  userId: string;
  onSuccess: () => void;
  refreshTable: () => void;
}) => {
  const { fetchUser, updateUser } = useUserActions();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const data = await fetchUser(userId);

      if (data?.user) {
        setUser(data.user);
        setFormData({
          fullName: data.user.fullName || "",
          username: data.user.username || "",
          email: data.user.email || "",
        });
      }
      setLoading(false);
    };

    loadUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await updateUser({ id: userId, ...formData });
      refreshTable(); // Refresh table after update
      onSuccess(); // Close modal
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Loader loading={loading}>
      <div className="flex flex-col gap-6">
        <div>
          <Label>Full Name</Label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder={user?.fullName || "Full Name"}
          />
        </div>
        <div>
          <Label>Username</Label>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder={user?.username || "Username"}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={user?.email || "Email"}
          />
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Update</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to update this user?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Confirm"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Loader>
  );
};

export default UpdateUser;
