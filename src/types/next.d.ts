// src/types/next.d.ts

import { User } from "@prisma/client";

declare module "next/server" {
  interface NextRequest {
    user?: User;
  }
}
