//view.tsx
import React, { useEffect, useState } from "react";
import { useUserActions } from "@/hooks/user/action-user";
import { Loader } from "@/components/loader";
import Image from "next/image";

const ViewUser = ({ userId }: { userId: string }) => {
  const { fetchUser } = useUserActions();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUser(userId);
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  return (
    <Loader loading={loading}>
      {!user ? (
        <p>User not found</p>
      ) : (
        <div className="flex flex-col gap-4">
          <p>
            <strong>Profile Pic:</strong>
            <Image
              src={user.profilePic}
              height={300}
              width={300}
              className="w-64 h-64 object-cover"
              alt="User Profile"
            />
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Full Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}
    </Loader>
  );
};

export default ViewUser;
