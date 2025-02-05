import { NextRequest, NextResponse } from "next/server";
import { deleteImage } from "@/lib/cloudinary";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const folder = req.nextUrl.searchParams.get("folder");

    if (!id || !folder) {
      return NextResponse.json(
        { error: "Image ID and folder are required" },
        { status: 400 }
      );
    }
    const isDeleted = await deleteImage(id, folder);
    if (!isDeleted) {
      return NextResponse.json(
        { error: "Failed to delete the image" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting image:", error.message);
    return NextResponse.json(
      { error: "Failed to delete image", details: error.message },
      { status: 500 }
    );
  }
}
