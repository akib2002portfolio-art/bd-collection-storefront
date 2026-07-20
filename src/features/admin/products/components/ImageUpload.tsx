import { useRef, useState } from "react";

import { storageService } from "../services/storageService";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export function ImageUpload({
  value,
  onChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleSelectImage(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);

    try {
      const imageUrl =
        await storageService.uploadProductImage(file);

      onChange(imageUrl);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to upload image.");
      }
    } finally {
      setUploading(false);

      // Allow selecting the same image again
      event.target.value = "";
    }
  }

  async function handleRemove() {
    if (!value) {
      return;
    }

    try {
      await storageService.deleteProductImage(value);

      onChange(null);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to delete image.");
      }
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleSelectImage}
      />

      {value ? (
        <div className="space-y-4">
          <img
            src={value}
            alt="Product Preview"
            className="h-56 w-full rounded-md border border-hairline object-cover"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-md border border-hairline px-4 py-2 transition hover:bg-bone"
            >
              Replace Image
            </button>

            <button
              type="button"
              onClick={handleRemove}
              className="rounded-md border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50"
            >
              Remove Image
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex h-56 w-full items-center justify-center rounded-md border-2 border-dashed border-hairline transition hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading
            ? "Uploading..."
            : "Choose Product Image"}
        </button>
      )}
    </div>
  );
}