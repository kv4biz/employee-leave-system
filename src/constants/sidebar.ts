import { FileText, UserCircle, LogOut, Home, User } from "lucide-react";

export const EMPLOYEE_MENU = [
  {
    icon: UserCircle,
    name: "My Account",
    subMenu: [
      { name: "ID Card", path: "id-card" },
      { name: "Change Password", path: "change-password" },
    ],
  },
  {
    icon: FileText,
    name: "My Requests",
    subMenu: [
      { name: "View All Requests", path: "view-requests" },
      { name: "Create New Request", path: "create-request" },
    ],
  },
];

export const ADMIN_MENU = [
  {
    icon: Home,
    name: "Dashboard",
    subMenu: [{ name: "Home", path: "home" }],
  },

  {
    icon: User,
    name: "Manage Employees",
    subMenu: [
      { name: "View Employees", path: "view-users" },
      { name: "Create New User", path: "create-user" },
    ],
  },
  {
    icon: FileText,
    name: "Manage Requests",
    subMenu: [{ name: "View All Requests", path: "view-requests" }],
  },
  {
    icon: UserCircle,
    name: "My Account",
    subMenu: [
      { name: "ID Card", path: "id-card" },
      { name: "Change Password", path: "change-password" },
    ],
  },
];

export const LOGOUT_MENU = {
  icon: LogOut,
  name: "Logout",
};
