"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import FormGenerator from "../form-generator";
import { LOGIN_FORM_FIELDS } from "@/constants/forms";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex justify-center">
      <div className="flex w-full flex-col gap-4">
        <h2 className="md:text-4xl text-2xl text-center font-semibold">
          Login
        </h2>
        <p className="text-gray-800 dark:text-gray-200 tracking-wide text-sm text-center">
          Enter your username and password to access your account.
        </p>
        {LOGIN_FORM_FIELDS.map((field) => (
          <FormGenerator
            key={field.id}
            {...field}
            register={register}
            name={field.name}
            errors={errors}
          />
        ))}
      </div>
    </div>
  );
};

export default LoginForm;
