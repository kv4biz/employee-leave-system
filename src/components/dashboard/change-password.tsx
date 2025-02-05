"use client";

import React from "react";
import ChangePasswordForm from "@/components/forms/change-password/change-password-form";
import ChangePasswordFormProvider from "@/components/forms/change-password/form-provider";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

const ChangePassword = () => {
  return (
    <div>
      <ChangePasswordFormProvider>
        <ChangePasswordForm />
        <div className="w-full flex flex-col gap-3 items-center">
          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2"
          >
            Change password
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </ChangePasswordFormProvider>
    </div>
  );
};

export default ChangePassword;
