"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import FormGenerator from "@/components/forms/form-generator";
import { REQUEST_FORM_FIELDS } from "@/constants/forms";

const RequestForm = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <div className="flex  justify-center">
      <div className="flex w-full flex-col gap-4">
        <h2 className="md:text-4xl text-2xl text-center font-semibold">
          Create Leave Request
        </h2>
        <p className="text-gray-800 dark:text-gray-200 tracking-wide text-sm text-center">
          Enter your old password and new password for account.
        </p>
        {REQUEST_FORM_FIELDS.map((field) => (
          <FormGenerator
            key={field.id}
            {...field}
            register={register}
            errors={errors}
            onDateRangeChange={(range) => setValue("dateRange", range)}
          />
        ))}
      </div>
    </div>
  );
};

export default RequestForm;
