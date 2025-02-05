//table-provider.tsx
"use client";

import { Loader } from "@/components/loader";
import { ReactNode } from "react";
import { useUserActions } from "@/hooks/user/action-user";

type TableProviderProps = {
  children: (data: any[]) => ReactNode;
};

const TableProvider = ({ children }: TableProviderProps) => {
  const { users, isUsersLoading } = useUserActions();

  return <Loader loading={isUsersLoading}>{children(users)}</Loader>;
};

export default TableProvider;
