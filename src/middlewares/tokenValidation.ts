import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export async function validateToken(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

    // Fetch the user and validate the token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || user.token !== token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Attach the user to the request
    req.user = user;

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
