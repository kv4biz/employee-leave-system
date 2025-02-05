"use client";

import { FormProvider } from "react-hook-form";
import { Loader } from "@/components/loader";
import { useUser } from "@/hooks/user/use-user";

type Props = { children: React.ReactNode };

const UserFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useUser();

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

export default UserFormProvider;
