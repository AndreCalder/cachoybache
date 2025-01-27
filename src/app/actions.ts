"use server";

import { createClient } from "@supabase/supabase-js";

export async function uploadFileAction(file: File) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
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
      process.env.NEXT_PUBLIC_SUPABASE_URL
    }/storage/v1/object/public/${bucket}/${encodeURI(path)}`;
  }
}
