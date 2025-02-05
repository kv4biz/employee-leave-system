import { NextRequest, NextResponse } from "next/server";

export function authorizeRoles(allowedRoles: string[]) {
  return (req: NextRequest) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.next();
  };
}
