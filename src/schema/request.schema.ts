import { z } from "zod";

export const requestSchema = z.object({
  dateRange: z.object({
    from: z.date().nullable(),
    to: z.date().nullable(),
  }),
  reason: z.string().min(30, "Reason must be at least 30 characters"),
});

export type RequestFormValues = z.infer<typeof requestSchema>;
