import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { HeroSlide, HeroSlideFormData } from "../../types";
import {
  heroSchema,
  type HeroFormValues,
} from "../../validation";

interface HeroSlideFormProps {
  initialValues?: HeroSlide;

  loading?: boolean;

  onSubmit: (values: HeroSlideFormData) => void | Promise<void>;
}

export function HeroSlideForm({
  initialValues,
  loading = false,
  onSubmit,
}: HeroSlideFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),

    defaultValues: {
      title: "",
      subtitle: "",

      buttonText: "",
      buttonLink: "",

      imageUrl: "",

      displayOrder: 0,

      isActive: true,
    },
  });

  useEffect(() => {
    if (!initialValues) return;

    reset({
      title: initialValues.title,
      subtitle: initialValues.subtitle ?? "",

      buttonText: initialValues.buttonText ?? "",
      buttonLink: initialValues.buttonLink ?? "",

      imageUrl: initialValues.imageUrl ?? "",

      displayOrder: initialValues.displayOrder,

      isActive: initialValues.isActive,
    });
  }, [initialValues, reset]);

  const submit = (values: HeroFormValues) => {
  onSubmit({
    title: values.title,

    subtitle: values.subtitle ?? "",

    buttonText: values.buttonText ?? "",
    buttonLink: values.buttonLink ?? "",

    imageUrl: values.imageUrl,

    displayOrder: values.displayOrder,

    isActive: values.isActive,
  });
};

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Title
        </label>

        <input
          {...register("title")}
          className="w-full rounded-md border px-3 py-2"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Subtitle
        </label>

        <textarea
          {...register("subtitle")}
          rows={4}
          className="w-full rounded-md border px-3 py-2"
        />

        {errors.subtitle && (
          <p className="mt-1 text-sm text-red-500">
            {errors.subtitle.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Button Text
          </label>

          <input
            {...register("buttonText")}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Button Link
          </label>

          <input
            {...register("buttonLink")}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Image URL
        </label>

        <input
          {...register("imageUrl")}
          className="w-full rounded-md border px-3 py-2"
        />

        {errors.imageUrl && (
          <p className="mt-1 text-sm text-red-500">
            {errors.imageUrl.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Display Order
          </label>

          <input
            type="number"
            {...register("displayOrder", {
              valueAsNumber: true,
            })}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("isActive")}
          />

          <span>Active</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-black px-5 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Hero Slide"}
      </button>
    </form>
  );
}