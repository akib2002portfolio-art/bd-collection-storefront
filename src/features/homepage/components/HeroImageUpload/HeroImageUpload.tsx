import { type ChangeEvent, useRef, useState } from "react";

import { heroStorage } from "../../services/heroStorage";

interface HeroImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export function HeroImageUpload({
  value,
  onChange,
}: HeroImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleSelectImage(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const previousImage = value;

    try {
      const imageUrl =
        await heroStorage.uploadHeroImage(file);

      if (previousImage) {
        try {
          await heroStorage.deleteHeroImage(previousImage);
        } catch (error) {
          console.error(
            "Failed to delete previous image:",
            error,
          );
        }
      }

      onChange(imageUrl);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to upload image.",
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function handleRemove() {
    if (!value) return;

    setUploading(true);

    try {
      await heroStorage.deleteHeroImage(value);

      onChange(null);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to remove image.",
      );
    } finally {
      setUploading(false);
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
            alt="Hero Preview"
            className="h-56 w-full rounded-md border object-cover"
          />

          <div className="flex gap-3">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : "Replace Image"}
            </button>

            <button
              type="button"
              disabled={uploading}
              onClick={handleRemove}
              className="rounded-md border border-red-500 px-4 py-2 text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
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
          className="flex h-56 w-full items-center justify-center rounded-md border-2 border-dashed disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading
            ? "Uploading..."
            : "Choose Hero Image"}
        </button>
      )}
    </div>
  );
}