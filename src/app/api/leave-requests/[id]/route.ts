import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateToken } from "@/middlewares/tokenValidation";
import { sendEmail } from "@/lib/emailSender";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const response = await validateToken(req);
  if (response.status !== 200) return response;

  const user = (req as any).user;
  const { id } = await context.params;

  try {
    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id },
      include: { employee: true },
    });

    if (!leaveRequest) {
      return NextResponse.json(
        { error: "Leave request not found" },
        { status: 404 }
      );
    }

    if (user.role !== "ADMIN" && leaveRequest.employeeId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json(leaveRequest, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching leave request:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch leave request" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const response = await validateToken(req);
  if (response.status !== 200) return response;
  const user = (req as any).user;
  if (user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Only admins can update leave requests" },
      { status: 403 }
    );
  }

  const { id } = await context.params;

  try {
    const { status } = await req.json();
    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const leaveRequest = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status,
        approvedBy: `${user.fullName}`,
      },
      include: { employee: true },
    });

    const emailSent = await sendEmail(
      leaveRequest.employee.email,
      "Leave Request Status Update",
      `<p>Your leave request has been updated to <strong>${status}</strong> by ${user.fullName}.</p>`
    );

    if (!emailSent) {
      console.warn(
        "Failed to send email notification for leave request update"
      );
    }

    return NextResponse.json(leaveRequest, { status: 200 });
  } catch (error: any) {
    console.error("Error updating leave request:", error.message);
    return NextResponse.json(
      { error: "Failed to update leave request" },
      { status: 500 }
    );
  }
}
