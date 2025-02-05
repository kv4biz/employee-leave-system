//tab;e-provider.tsx
"use client";

import { Loader } from "@/components/loader";
import { ReactNode } from "react";
import { useRequestActions } from "@/hooks/request/action-request";

type TableProviderProps = {
  children: (data: any[]) => ReactNode;
};

const TableProvider = ({ children }: TableProviderProps) => {
  const { leaveRequests, isLoading } = useRequestActions();

  return <Loader loading={isLoading}>{children(leaveRequests)}</Loader>;
};

export default TableProvider;
