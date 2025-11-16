/**
 * Upload utilities - now uses Flask API instead of server actions
 * This removes the 4.5MB Vercel serverless function limit
 */

import { uploadFile as apiUploadFile, uploadVideo as apiUploadVideo } from "./api";

export async function uploadFileAction(file: File): Promise<string> {
  try {
    const url = await apiUploadFile(file);
    return url || "";
  } catch (error) {
    console.error("Error uploading file:", error);
    return "";
  }
}

export async function uploadVideo(file: File): Promise<string> {
  try {
    const uri = await apiUploadVideo(file);
    return uri || "";
  } catch (error) {
    console.error("Error uploading video:", error);
    return "Failed to upload video";
  }
}
