"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import FormGenerator from "@/components/forms/form-generator";
import { USER_FORM_FIELDS } from "@/constants/forms";

const UserForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex justify-center">
      <div className="flex w-full flex-col gap-4">
        <h2 className="md:text-4xl text-2xl text-center font-semibold">
          Create User
        </h2>
        <p className="text-gray-800 dark:text-gray-200 tracking-wide text-sm text-center">
          Fill in the details to create a new user.
        </p>
        {USER_FORM_FIELDS.map((field) => (
          <FormGenerator
            key={field.id}
            {...field}
            register={register}
            errors={errors}
          />
        ))}
      </div>
    </div>
  );
};

export default UserForm;
