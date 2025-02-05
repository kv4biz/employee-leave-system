"use client";

import { Loader } from "@/components/loader";
import { useChangePassword } from "@/hooks/change-password/use-change-password";
import React from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: React.ReactNode;
};

const ChangePasswordFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useChangePassword();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onHandleSubmit}
        className="flex w-full items-center justify-center"
      >
        <div className="flex flex-col justify-between max-w-lg gap-3 w-full">
          <Loader loading={loading}>{children}</Loader>
        </div>
      </form>
    </FormProvider>
  );
};

export default ChangePasswordFormProvider;
