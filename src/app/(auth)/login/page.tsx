"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserSession } from "@/lib/auth";
import LoginFormProvider from "@/components/forms/login/form-provider";
import LoginForm from "@/components/forms/login/login-form";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getUserSession();
      if (session) {
        router.replace("/dashboard");
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="flex-1 py-36 md:px-10 w-full">
      <div className="flex flex-col h-full gap-3">
        <LoginFormProvider>
          <div className="flex flex-col gap-3">
            <LoginForm />
            <div className="w-full flex flex-col gap-3 items-center">
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
              >
                Login
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-light">
              <span>Forgot password?</span>
              <Link
                href={"/forgot-password"}
                className="underline underline-offset-4"
              >
                Click here.
              </Link>
            </div>
          </div>
        </LoginFormProvider>
      </div>
    </div>
  );
};

export default LoginPage;
