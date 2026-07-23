import { supabase } from "../../../lib/supabase";

const BUCKET_NAME = "products";

async function uploadFile(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);

  return publicUrl;
}

async function uploadLogo(file: File): Promise<string> {
  return uploadFile(file);
}

async function uploadFavicon(file: File): Promise<string> {
  return uploadFile(file);
}

export const storageService = Object.freeze({
  uploadLogo,
  uploadFavicon,
});