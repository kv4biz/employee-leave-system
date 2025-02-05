//view-users.rsx
"use client";

import UserTable from "@/components/tables/user/user-table";

const ViewUsers = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">User List</h1>
      <UserTable />
    </div>
  );
};

export default ViewUsers;
