"use server";

import { createClient } from "@supabase/supabase-js";
import vimeo from "@vimeo/vimeo";
import axios from "axios";

export async function uploadFileAction(file: File) {
  const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || ""
  );

  const bucket = "cachoybache";
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${file.name.replace(/[^a-zA-Z ]/g, "")}_${Date.now()}`, file);
  if (error) {
    return "";
  } else if (data) {
    let { path } = data;
    return `${
      process.env.SUPABASE_URL
    }/storage/v1/object/public/${bucket}/${encodeURI(path)}`;
  }
}

export async function uploadVideo(file: File) {
  const accessToken = process.env.VIMEO_ACCESS_TOKEN || "";

  const initResponse = await axios.post(
    "https://api.vimeo.com/me/videos",
    {
      upload: {
        approach: "tus",
        size: file.size,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (initResponse.status !== 200) {
    return "Failed to initiate upload:";
  }

  const { upload, uri } = initResponse.data;
  const uploadLink = upload.upload_link;

  const uploadResponse = await fetch(uploadLink, {
    method: "PATCH",
    headers: {
      "Tus-Resumable": "1.0.0",
      "Content-Type": "application/offset+octet-stream",
      "Upload-Offset": "0", // For resumable uploads, adjust as needed
    },
    body: file, // Pass the File or Blob object directly
  });
  if (!uploadResponse.ok) {
    return "Failed to upload video:";
  }

  return uri;
}
