import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { loginSchema } from "@/schema/auth.schema";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((issue) => ({
        path: issue.path[0], // Field name
        message: issue.message, // Error message
      }));
      return NextResponse.json({ error: issues }, { status: 400 });
    }

    const { username, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        {
          error: [
            { path: "username", message: "Invalid username or password" },
          ],
        },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1d" });
    await prisma.user.update({ where: { id: user.id }, data: { token } });

    return NextResponse.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: [{ path: "general", message: "Internal server error" }] },
      { status: 500 }
    );
  }
}
