"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@hookform/error-message";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister, Path } from "react-hook-form";
import { DatePickerWithRange } from "@/components/DatePicker";
import ImageUploader from "../ImageUploader";

type Option = {
  value: string;
  label: string;
};

type Props = {
  type:
    | "text"
    | "email"
    | "password"
    | "textarea"
    | "select"
    | "dateRange"
    | "image";
  name: string;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  options?: Option[];
  defaultValue?: string;
  rows?: number;
  onDateRangeChange?: (value: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
};

const FormGenerator = ({
  type,
  name,
  label,
  placeholder,
  register,
  errors,
  options,
  defaultValue,
  rows = 4,
  onDateRangeChange,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Label className="flex flex-col gap-2">
      {label && <span className="font-medium">{label}</span>}
      <div className="relative">
        {type === "textarea" ? (
          <Textarea
            id={name}
            placeholder={placeholder}
            rows={rows}
            defaultValue={defaultValue}
            {...register(name)}
          />
        ) : type === "select" ? (
          <select
            id={name}
            defaultValue={defaultValue || ""}
            className="border w-full rounded-md p-2 focus:outline-none focus:ring focus:border-primary"
            {...register(name)}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "dateRange" ? (
          <DatePickerWithRange
            defaultRange={{
              from: undefined,
              to: undefined,
            }}
            onDateChange={(range) => {
              if (onDateRangeChange) {
                onDateRangeChange({
                  from: range?.from,
                  to: range?.to,
                });
              }
            }}
          />
        ) : type === "image" ? (
          <imgUploader
            name={name}
            onChange={(imageUrl) => {
              register(name).onChange({ target: { name, value: imageUrl } }); // ✅ Properly update form state
            }}
          />
        ) : (
          <Input
            id={name}
            type={type === "password" && showPassword ? "text" : type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...register(name)}
          />
        )}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-2 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-gray-500" />
            ) : (
              <Eye className="w-5 h-5 text-gray-500" />
            )}
          </button>
        )}
      </div>
      <ErrorMessage
        errors={errors}
        name={name as Path<any>}
        render={({ message }) =>
          typeof message === "string" ? (
            <p className="text-sm text-red-500">{message}</p>
          ) : (
            <p className="text-sm text-red-500">An error occurred</p>
          )
        }
      />
    </Label>
  );
};

export default FormGenerator;
