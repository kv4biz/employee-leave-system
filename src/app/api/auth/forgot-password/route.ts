import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/emailSender";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const resetToken = Math.random().toString(36).substr(2, 8);
    await prisma.user.update({
      where: { id: user.id },
      data: { token: resetToken },
    });

    const resetLink = `${process.env.APP_URL}/api/auth/reset-password?token=${resetToken}`;
    const emailSent = await sendEmail(
      user.email,
      "Password Reset Request",
      `<p>Hi ${user.fullName},</p><p>Click the link below to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`
    );

    if (!emailSent) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
