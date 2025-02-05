"use client";
import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@/hooks/use-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/Logo";
import DashboardPage from "@/app/dashboard/page";

type User = {
  id: string;
  email: string;
  fullName: string;
  profilePic: string | null;
  role: "ADMIN" | "EMPLOYEE";
  createdAt: string;
  updatedAt: string;
  username: string;
};

const DashboardLayout = () => {
  const { user } = useUser() as { user: User | null };
  const [activeComponent, setActiveComponent] = useState<string>("");

  useEffect(() => {
    if (!activeComponent && user) {
      setActiveComponent(user.role === "ADMIN" ? "home" : "id-card");
    }
  }, [user, activeComponent]);

  const getInitials = (fullName: string) => {
    const names = fullName.split(" ");
    return names
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  };

  return (
    <SidebarProvider className="flex">
      <AppSidebar
        user={user as { role: "ADMIN" | "EMPLOYEE" } | null}
        onMenuSelect={(path) => setActiveComponent(path)}
      />
      <main className="w-full">
        <div className="flex p-4 lg:px-8 w-full justify-between bg-foreground/5">
          <SidebarTrigger />
          <div className="block md:hidden">
            <Logo />
          </div>
          <div className="flex gap-x-8 items-center lg:pr-6">
            <Avatar>
              <AvatarImage
                src={user?.profilePic || undefined}
                alt={user?.fullName}
              />
              <AvatarFallback>
                {user?.fullName ? getInitials(user.fullName) : "NA"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <section className="p-4">
          {/* Pass activeComponent directly to DashboardPage */}
          <DashboardPage activeComponent={activeComponent} />
        </section>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
