"use client";

import React from "react";
import { Loader } from "@/components/loader";
import Home from "@/components/dashboard/home";
import IdCard from "@/components/dashboard/id-card";
import ViewUsers from "@/components/dashboard/view-users";
import ViewRequests from "@/components/dashboard/view-requests";
import CreateUser from "@/components/dashboard/create-user";
import ChangePassword from "@/components/dashboard/change-password";
import CreateRequest from "@/components/dashboard/create-request";

const componentMap: { [key: string]: React.FC } = {
  home: Home,
  "id-card": IdCard,
  "view-users": ViewUsers,
  "create-user": CreateUser,
  "view-requests": ViewRequests,
  "change-password": ChangePassword,
  "create-request": CreateRequest,
};

const DashboardPage = ({ activeComponent }: { activeComponent: string }) => {
  const ActiveComponent = componentMap[activeComponent];

  return (
    <div className="">
      {ActiveComponent ? (
        <ActiveComponent />
      ) : (
        <div>
          <Loader loading={true} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
