"use client";
import RequestFormProvider from "@/components/forms/request/form-provider";
import RequestForm from "@/components/forms/request/request-form";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
const CreateRequest = () => {
  return (
    <div>
      <RequestFormProvider>
        <RequestForm />
        <div className="w-full flex flex-col gap-3 items-center">
          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2"
          >
            Create request
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </RequestFormProvider>
    </div>
  );
};

export default CreateRequest;
