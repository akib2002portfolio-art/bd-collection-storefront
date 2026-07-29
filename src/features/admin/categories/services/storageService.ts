import { supabase } from "../../../../lib/supabase";

const BUCKET_NAME = "category-images";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function validateImage(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      "Only JPG, JPEG, PNG and WEBP images are allowed.",
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      "Image size must be less than 5MB.",
    );
  }
}

async function uploadCategoryImage(
  file: File,
): Promise<string> {
  validateImage(file);

  const extension = file.name
    .split(".")
    .pop();

  const fileName = `${crypto.randomUUID()}.${extension}`;

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

async function deleteCategoryImage(
  imageUrl: string,
): Promise<void> {
  const fileName = imageUrl.split("/").pop();

  if (!fileName) {
    return;
  }

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([fileName]);

  if (error) {
    throw new Error(error.message);
  }
}

export const storageService = Object.freeze({
  uploadCategoryImage,
  deleteCategoryImage,
});