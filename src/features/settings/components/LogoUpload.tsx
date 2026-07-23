import { type ChangeEvent, useRef, useState } from "react";

import { storageService } from "../services/storageService";

interface LogoUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  disabled?: boolean;
}

export function LogoUpload({
  value,
  onChange,
  disabled = false,
}: LogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleSelectLogo(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      const logoUrl =
        await storageService.uploadLogo(file);

      onChange(logoUrl);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to upload logo.",
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function handleRemove() {
    onChange(null);
  }

  const isDisabled = disabled || uploading;

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleSelectLogo}
      />

      {value ? (
        <div className="space-y-4">
          <img
            src={value}
            alt="Logo Preview"
            className="h-28 w-auto rounded-md border bg-white object-contain p-3"
          />

          <div className="flex gap-3">
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => inputRef.current?.click()}
              className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : "Replace Logo"}
            </button>

            <button
              type="button"
              disabled={isDisabled}
              onClick={handleRemove}
              className="rounded-md border border-red-500 px-4 py-2 text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Remove Logo
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => inputRef.current?.click()}
          className="flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading
            ? "Uploading..."
            : "Choose Logo"}
        </button>
      )}
    </div>
  );
}