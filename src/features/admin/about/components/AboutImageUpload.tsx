import { useRef, useState } from "react";

import { storageService } from "../../products/services/storageService";

interface AboutImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  disabled?: boolean;
}

export function AboutImageUpload({
  value,
  onChange,
  label = "Image",
  disabled = false,
}: AboutImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleSelectImage(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      const imageUrl =
        await storageService.uploadProductImage(file);

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

    try {
      await storageService.deleteProductImage(value);

      onChange(null);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to remove image.",
      );
    }
  }

  const isDisabled = disabled || uploading;

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
            alt={label}
            className="h-56 w-full rounded-lg border object-cover"
          />

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => inputRef.current?.click()}
              className="rounded-md border px-4 py-2 transition hover:bg-muted disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : "Replace Image"}
            </button>

            <button
              type="button"
              disabled={isDisabled}
              onClick={handleRemove}
              className="rounded-md border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              Remove Image
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => inputRef.current?.click()}
          className="flex h-56 w-full items-center justify-center rounded-lg border-2 border-dashed transition hover:bg-muted disabled:opacity-50"
        >
          {uploading
            ? "Uploading..."
            : `Choose ${label}`}
        </button>
      )}
    </div>
  );
}