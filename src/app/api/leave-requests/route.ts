import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateToken } from "@/middlewares/tokenValidation";

export async function POST(req: NextRequest) {
  const response = await validateToken(req);
  if (response.status !== 200) return response;

  const user = (req as any).user;
  if (user.role !== "EMPLOYEE") {
    return NextResponse.json(
      { error: "Only employees can create leave requests" },
      { status: 403 }
    );
  }

  try {
    const { startDate, endDate, reason } = await req.json();
    if (!startDate || !endDate || !reason) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        employeeId: user.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
      },
    });

    return NextResponse.json(leaveRequest, { status: 201 });
  } catch (error: any) {
    console.error("Error creating leave request:", error.message);
    return NextResponse.json(
      { error: "Failed to create leave request" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const response = await validateToken(req);
  if (response.status !== 200) return response;

  const user = (req as any).user;

  try {
    if (user.role === "ADMIN") {
      const leaveRequests = await prisma.leaveRequest.findMany({
        include: { employee: true },
      });
      return NextResponse.json(leaveRequests, { status: 200 });
    } else if (user.role === "EMPLOYEE") {
      const leaveRequests = await prisma.leaveRequest.findMany({
        where: { employeeId: user.id },
      });
      return NextResponse.json(leaveRequests, { status: 200 });
    } else {
      return NextResponse.json({ error: "Unauthorized role" }, { status: 403 });
    }
  } catch (error: any) {
    console.error("Error fetching leave requests:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch leave requests" },
      { status: 500 }
    );
  }
}
