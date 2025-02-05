// components/tables/request/request-table.tsx
"use client";

import * as React from "react";
import TableGenerator from "@/components/tables/table-generator";
import TableProvider from "@/components/tables/request/table-provider";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RequestActionOverlay from "@/components/actions/request/request-action-overlay";
import { useUser } from "@/hooks/use-user";
import { LeaveRequest } from "@/hooks/request/action-request";

const RequestTable = () => {
  const { user } = useUser();
  const isAdmin = user?.role === "ADMIN";

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState<
    "view" | "changeStatus" | null
  >(null);
  const [selectedRequestId, setSelectedRequestId] = React.useState<
    string | null
  >(null);
  const [refreshKey, setRefreshKey] = React.useState(0);

  const refreshTable = () => setRefreshKey((prev) => prev + 1);

  const openAction = (action: "view" | "changeStatus", requestId: string) => {
    setSelectedAction(action);
    setSelectedRequestId(requestId);
    setIsOpen(true);
  };

  const closeAction = () => {
    setIsOpen(false);
    setSelectedAction(null);
    setSelectedRequestId(null);
  };

  const columns: ColumnDef<LeaveRequest>[] = isAdmin
    ? [
        { accessorKey: "employeeId", header: "Employee ID" },
        {
          accessorFn: (row) => row.employee.fullName,
          id: "fullName",
          header: ({ column }) => (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Employee Name <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
        },
        {
          accessorKey: "startDate",
          header: ({ column }) => (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Start Date <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
          cell: ({ cell }) =>
            new Date(cell.getValue() as string).toLocaleDateString(),
        },
        {
          accessorKey: "endDate",
          header: ({ column }) => (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              End Date <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
          cell: ({ cell }) =>
            new Date(cell.getValue() as string).toLocaleDateString(),
        },
        { accessorKey: "status", header: "Status" },
        { accessorKey: "approvedBy", header: "Approved By" },
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => openAction("view", row.original.id)}
                >
                  View
                </DropdownMenuItem>
                {row.original.status === "PENDING" && (
                  <DropdownMenuItem
                    onClick={() => openAction("changeStatus", row.original.id)}
                  >
                    Change Status
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
      ]
    : [
        {
          accessorKey: "startDate",
          header: ({ column }) => (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Start Date <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
          cell: ({ cell }) =>
            new Date(cell.getValue() as string).toLocaleDateString(),
        },
        {
          accessorKey: "endDate",
          header: ({ column }) => (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              End Date <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
          cell: ({ cell }) =>
            new Date(cell.getValue() as string).toLocaleDateString(),
        },
        { accessorKey: "status", header: "Status" },
        { accessorKey: "approvedBy", header: "Approved By" },
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => openAction("view", row.original.id)}
                >
                  View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
      ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">
        {isAdmin ? "All Leave Requests" : "My Leave Requests"}
      </h2>
      <TableProvider key={refreshKey}>
        {(requests) => (
          <TableGenerator
            columns={columns}
            data={requests}
            statusFilterKey="status"
          />
        )}
      </TableProvider>
      <RequestActionOverlay
        isOpen={isOpen}
        action={selectedAction}
        requestId={selectedRequestId}
        onClose={closeAction}
        refreshTable={refreshTable}
      />
    </>
  );
};

export default RequestTable;
