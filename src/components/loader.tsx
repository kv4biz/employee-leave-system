"use client";

import React from "react";

type LoaderProps = {
  loading: boolean;
  children?: React.ReactNode;
};

export const Loader = ({ loading, children }: LoaderProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-200" />
      </div>
    );
  }

  return <>{children}</>;
};
