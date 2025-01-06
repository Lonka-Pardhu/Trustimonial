import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload image
export const uploadImageToCloudinary = async (
  filePath: string,
  options: { folder?: string; public_id?: string; overwrite?: boolean } = {}
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: options.folder || "default-folder", // Specify a folder in Cloudinary
      public_id: options.public_id, // Optional custom public ID
      overwrite: options.overwrite || false, // Optional overwrite flag
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error: any) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};
// Helper function to upload image
export default cloudinary;
