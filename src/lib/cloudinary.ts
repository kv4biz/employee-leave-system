import { v2 as cloudinary } from "cloudinary";
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default cloudinary;

// Generic Image Upload
export const uploadImage = async (
  filePath: string,
  folder: string,
  options?: {
    publicId?: string;
    overwrite?: boolean;
    transformations?: object;
  }
): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      public_id: options?.publicId,
      overwrite: options?.overwrite || false,
      transformation: options?.transformations,
    });
    return result.secure_url;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Cloudinary upload error: ${error.message}`);
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
    throw new Error("Cloudinary upload failed: Unknown error");
  }
};

// Generic Image Deletion
export const deleteImage = async (
  publicId: string,
  folder: string
): Promise<boolean> => {
  try {
    await cloudinary.uploader.destroy(`${folder}/${publicId}`);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Cloudinary deletion error: ${error.message}`);
      throw new Error(`Cloudinary deletion failed: ${error.message}`);
    }
    throw new Error("Cloudinary deletion failed: Unknown error");
  }
};
