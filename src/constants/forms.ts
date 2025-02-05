type FormField = {
  id: string;
  name: string;
  type:
    | "text"
    | "password"
    | "email"
    | "textarea"
    | "select"
    | "dateRange"
    | "image";
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
};

export const LOGIN_FORM_FIELDS: FormField[] = [
  {
    id: "username",
    name: "username",
    type: "text",
    label: "Username",
    placeholder: "Enter your username",
  },
  {
    id: "password",
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
];

export const CHANGE_PASSWORD_FIELDS: FormField[] = [
  {
    id: "oldPassword",
    name: "oldPassword",
    type: "password",
    label: "Old Password",
    placeholder: "Enter your old password",
  },
  {
    id: "newPassword",
    name: "newPassword",
    type: "password",
    label: "New Password",
    placeholder: "Enter your new password",
  },
  {
    id: "confirmPassword",
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    placeholder: "Confirm your new password",
  },
];

export const REQUEST_FORM_FIELDS: FormField[] = [
  {
    id: "dateRange",
    name: "dateRange",
    type: "dateRange",
    label: "Leave Date Range",
  },
  {
    id: "reason",
    name: "reason",
    type: "textarea",
    label: "Reason",
    placeholder: "Enter the reason for leave",
  },
];

export const USER_FORM_FIELDS: FormField[] = [
  {
    id: "fullName",
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter full name",
  },
  {
    id: "username",
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter username",
  },
  {
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },

  {
    id: "role",
    name: "role",
    label: "Role",
    type: "select",
    options: [
      { value: "EMPLOYEE", label: "Employee" },
      { value: "ADMIN", label: "Admin" },
    ],
  },
  {
    id: "profilePic",
    name: "profilePic",
    label: "Profile Picture",
    type: "image",
  },
];
