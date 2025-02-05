// user-table.tsx
"use client";

import * as React from "react";
import TableGenerator from "@/components/tables/table-generator";
import TableProvider from "@/components/tables/user/table-provider";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserActionOverlay from "@/components/actions/user/user-action-overlay";

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  profilePic: string;
  createdAt: string;
}

const UserTable = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState<
    "view" | "update" | "terminate" | null
  >(null);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
    null
  );
  const [refreshKey, setRefreshKey] = React.useState(0);

  const refreshTable = () => setRefreshKey((prev) => prev + 1);

  const openAction = (
    action: "view" | "update" | "terminate",
    userId: string
  ) => {
    setSelectedAction(action);
    setSelectedUserId(userId);
    setIsOpen(true);
  };

  const closeAction = () => {
    setIsOpen(false);
    setSelectedAction(null);
    setSelectedUserId(null);
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    { accessorKey: "role", header: "Role" },
    {
      accessorKey: "profilePic",
      header: "Profile Picture",
      cell: ({ row }) => (
        <img
          src={row.original.profilePic}
          alt="Profile Pic"
          width={40}
          height={40}
          className="h-10 w-10 object-cover rounded-full"
        />
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const userId = row.original?.id;
        if (!userId) return null;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => openAction("view", userId)}>
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openAction("update", userId)}>
                Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openAction("terminate", userId)}>
                Terminate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <TableProvider key={refreshKey}>
        {(users) => <TableGenerator columns={columns} data={users} />}
      </TableProvider>
      <UserActionOverlay
        isOpen={isOpen}
        action={selectedAction}
        userId={selectedUserId}
        onClose={closeAction}
        refreshTable={refreshTable}
      />
    </>
  );
};

export default UserTable;
