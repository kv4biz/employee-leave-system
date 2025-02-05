import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filePath, publicId, transformations } = body;

    const folder = "els-users";
    if (!filePath) {
      return NextResponse.json(
        { error: "filePath is required" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const imageUrl = await uploadImage(filePath, folder, {
      publicId,
      transformations,
    });

    return NextResponse.json({ imageUrl }, { status: 201 });
  } catch (error: any) {
    console.error("Error uploading image:", error.message);
    return NextResponse.json(
      { error: "Failed to upload image", details: error.message },
      { status: 500 }
    );
  }
}
