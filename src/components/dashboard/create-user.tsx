"use client";
import UserFormProvider from "@/components/forms/user/form-provider";
import UserForm from "@/components/forms/user/user-form";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
const CreateUser = () => {
  return (
    <div>
      <UserFormProvider>
        <UserForm />
        <div className="w-full flex flex-col gap-3 items-center">
          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2"
          >
            Create user
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </UserFormProvider>
    </div>
  );
};

export default CreateUser;
