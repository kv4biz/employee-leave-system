// components/ui/AppSidebar.tsx
"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { EMPLOYEE_MENU, ADMIN_MENU, LOGOUT_MENU } from "@/constants/sidebar";
import Logo from "./Logo";
import { useLogout } from "@/hooks/use-logout";

type AppSidebarProps = {
  user: { id: string; role: "ADMIN" | "EMPLOYEE" } | null;
  onMenuSelect: (path: string) => void;
};

export function AppSidebar({ user, onMenuSelect }: AppSidebarProps) {
  const [activeMenu, setActiveMenu] = useState<string>("");
  const { logout } = useLogout();

  if (!user) return null;

  const menuItems = user.role === "ADMIN" ? ADMIN_MENU : EMPLOYEE_MENU;

  const handleMenuClick = (path: string) => {
    setActiveMenu(path);
    onMenuSelect(path);
  };

  const handleLogout = () => {
    logout(user.id);
  };

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="bg-foreground/10 h-16 flex items-center justify-center">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <CollapsibleMenuItem
                  key={index}
                  item={item}
                  activeMenu={activeMenu}
                  onClick={handleMenuClick}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button onClick={handleLogout} className="flex items-center">
                <LOGOUT_MENU.icon className="mr-2" />
                <span>{LOGOUT_MENU.name}</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

type SidebarMenuItemProps = {
  item: {
    icon: React.ElementType;
    name: string;
    subMenu?: { name: string; path: string }[];
    path?: string;
  };
  activeMenu: string;
  onClick: (path: string) => void;
};

const CollapsibleMenuItem = ({
  item,
  activeMenu,
  onClick,
}: SidebarMenuItemProps) => {
  const isActive = (path: string) => activeMenu === path;

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem className="">
        <CollapsibleTrigger
          className={`${
            isActive(item.path || "") ? "bg-black/20 dark:bg-white/20" : ""
          } flex w-full gap-4 p-2 items-center`}
        >
          <item.icon className="mr-2" />
          <span>{item.name}</span>
        </CollapsibleTrigger>
        {item.subMenu && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.subMenu.map((subItem, index) => (
                <SidebarMenuSubItem key={index}>
                  <SidebarMenuButton asChild>
                    <a
                      href="#"
                      className={`${
                        isActive(subItem.path)
                          ? "bg-black/20 dark:bg-white/20"
                          : ""
                      }`}
                      onClick={() => onClick(subItem.path)}
                    >
                      {subItem.name}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
};
