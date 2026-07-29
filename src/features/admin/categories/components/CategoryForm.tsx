import { useEffect, useRef, useState } from "react";
import { storageService } from "../services/storageService";
import type { Category } from "../types/category";

export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  image: string | null;
  display_order: number;
}

interface CategoryFormProps {
  initialData?: Category;
  loading?: boolean;
  onSubmit: (
    data: CategoryFormData,
  ) => Promise<void>;
}

export function CategoryForm({
  initialData,
  loading = false,
  onSubmit,
}: CategoryFormProps) {
  const [formData, setFormData] =
    useState<CategoryFormData>({
      name: "",
      slug: "",
      description: "",
      image: null,
      display_order: 0,
    });
  const [uploading, setUploading] = useState(false);

  const [uploadError, setUploadError] =
    useState<string | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      name: initialData.name,
      slug: initialData.slug ?? "",
      description:
        initialData.description ?? "",
      image: initialData.image,
      display_order:
        initialData.display_order,
    });
  }, [initialData]);

  function updateField<
    K extends keyof CategoryFormData,
  >(
    key: K,
    value: CategoryFormData[K],
  ) {
    setFormData((previous) => ({
      ...previous,
      [key]: value,
    }));
  }
  async function handleImageUpload(
    file: File,
  ) {
    try {
      setUploading(true);
      setUploadError(null);

      const imageUrl =
        await storageService.uploadCategoryImage(
          file,
        );

      updateField("image", imageUrl);
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "Image upload failed.",
      );
    } finally {
      setUploading(false);
    }
  }
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    await onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-hairline bg-canvas p-8"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Category Name
        </label>

        <input
          required
          value={formData.name}
          placeholder="Men's Wear"
          onChange={(e) => {
            const name = e.target.value;

            updateField("name", name);

            updateField(
              "slug",
              name
                .trim()
                .toLowerCase()
                .replace(
                  /[^a-z0-9\s-]/g,
                  "",
                )
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-"),
            );
          }}
          className="w-full rounded-md border border-hairline px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) =>
            updateField(
              "description",
              e.target.value,
            )
          }
          className="w-full rounded-md border border-hairline px-4 py-3"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Category Image
          </label>

          <div className="space-y-4">

            <div className="flex h-48 items-center justify-center overflow-hidden rounded-lg border border-hairline bg-muted">

              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Category Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm text-muted-foreground">
                  No image selected
                </span>
              )}

            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={async (e) => {
                const file =
                  e.target.files?.[0];

                if (!file) return;

                await handleImageUpload(file);
              }}
            />

            <button
              type="button"
              disabled={uploading}
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="rounded-md border border-hairline px-4 py-2 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : formData.image
                  ? "Replace Image"
                  : "Browse Image"}
            </button>

            {uploadError && (
              <p className="text-sm text-red-500">
                {uploadError}
              </p>
            )}

          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Display Order
          </label>

          <input
            type="number"
            min={0}
            value={formData.display_order}
            onChange={(e) =>
              updateField(
                "display_order",
                Number(e.target.value) || 0,
              )
            }
            className="w-full rounded-md border border-hairline px-4 py-3"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-ink px-6 py-3 text-canvas transition hover:bg-sienna disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save Category"}
        </button>
      </div>
    </form>
  );
}