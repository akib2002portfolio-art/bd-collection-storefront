import { supabase } from "../../../lib/supabase";

const BUCKET_NAME = "products";

async function uploadHeroImage(
  file: File,
): Promise<string> {
  const fileExt =
    file.name.split(".").pop();

  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error } =
    await supabase.storage
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

async function deleteHeroImage(
  imageUrl: string,
): Promise<void> {
  const fileName =
    imageUrl.split("/").pop();

  if (!fileName) {
    return;
  }

  const { error } =
    await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName]);

  if (error) {
    throw new Error(error.message);
  }
}

export const heroStorage =
  Object.freeze({
    uploadHeroImage,
    deleteHeroImage,
  });