import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../components/ui/button";
import { FormField } from "../../../../components/ui/FormField";

import {
  aboutSchema,
  type AboutFormValues,
} from "../../../about/validation";

import { AboutImageUpload } from "./AboutImageUpload";

interface AboutFormProps {
  initialValues: AboutFormValues;

  loading: boolean;

  onSubmit(
    values: AboutFormValues,
  ): Promise<void>;
}

export function AboutForm({
  initialValues,
  loading,
  onSubmit,
}: AboutFormProps) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: {
      errors,
      isDirty,
    },
  } = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  function handleReset() {
    reset(initialValues);
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-5xl space-y-8"
    >
      {/* Hero */}

      <section className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
        <div className="space-y-1 border-b pb-4">
          <h3 className="text-lg font-semibold">
            Hero Section
          </h3>

          <p className="text-sm text-muted-foreground">
            Configure the hero content displayed on the About page.
          </p>
        </div>

        <FormField
          label="Eyebrow"
          error={errors.eyebrow}
        >
          <input
            {...register("eyebrow")}
            className="w-full rounded-md border px-3 py-2"
          />
        </FormField>

        <FormField
          label="Title"
          error={errors.title}
        >
          <input
            {...register("title")}
            className="w-full rounded-md border px-3 py-2"
          />
        </FormField>

        <FormField
          label="Short Description"
          error={errors.shortDescription}
        >
          <textarea
            rows={4}
            {...register("shortDescription")}
            className="w-full rounded-md border px-3 py-2"
          />
        </FormField>
      </section>

      {/* Story */}

      <section className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
        <div className="space-y-1 border-b pb-4">
          <h3 className="text-lg font-semibold">
            Company Story
          </h3>

          <p className="text-sm text-muted-foreground">
            Tell visitors about your business, mission and vision.
          </p>
        </div>

        <FormField
          label="Story"
          error={errors.story}
        >
          <textarea
            rows={8}
            {...register("story")}
            className="w-full rounded-md border px-3 py-2"
          />
        </FormField>

        <FormField
          label="Mission"
          error={errors.mission}
        >
          <textarea
            rows={4}
            {...register("mission")}
            className="w-full rounded-md border px-3 py-2"
          />
        </FormField>

        <FormField
          label="Vision"
          error={errors.vision}
        >
          <textarea
            rows={4}
            {...register("vision")}
            className="w-full rounded-md border px-3 py-2"
          />
        </FormField>
      </section>

      {/* Statistics */}

      <section className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
        <div className="space-y-1 border-b pb-4">
          <h3 className="text-lg font-semibold">
            Statistics
          </h3>

          <p className="text-sm text-muted-foreground">
            Highlight your business achievements.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">

          <FormField
            label="Years Experience"
            error={errors.yearsExperience}
          >
            <input
              type="number"
              {...register("yearsExperience", {
                valueAsNumber: true,
              })}
              className="w-full rounded-md border px-3 py-2"
            />
          </FormField>

          <FormField
            label="Happy Customers"
            error={errors.happyCustomers}
          >
            <input
              type="number"
              {...register("happyCustomers", {
                valueAsNumber: true,
              })}
              className="w-full rounded-md border px-3 py-2"
            />
          </FormField>

          <FormField
            label="Products Count"
            error={errors.productsCount}
          >
            <input
              type="number"
              {...register("productsCount", {
                valueAsNumber: true,
              })}
              className="w-full rounded-md border px-3 py-2"
            />
          </FormField>

        </div>
      </section>

      {/* Images */}

      <section className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
        <div className="space-y-1 border-b pb-4">
          <h3 className="text-lg font-semibold">
            Images
          </h3>

          <p className="text-sm text-muted-foreground">
            Upload hero and secondary images.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          <FormField label="Hero Image">
            <Controller
              control={control}
              name="heroImage"
              render={({ field }) => (
                <AboutImageUpload
                  label="Hero Image"
                  value={field.value || null}
                  onChange={(value) =>
                    field.onChange(value ?? "")
                  }
                />
              )}
            />
          </FormField>

          <FormField label="Secondary Image">
            <Controller
              control={control}
              name="secondaryImage"
              render={({ field }) => (
                <AboutImageUpload
                  label="Secondary Image"
                  value={field.value || null}
                  onChange={(value) =>
                    field.onChange(value ?? "")
                  }
                />
              )}
            />
          </FormField>

        </div>
      </section>

      {/* SEO */}

      <section className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
        <div className="space-y-1 border-b pb-4">
          <h3 className="text-lg font-semibold">
            SEO
          </h3>

          <p className="text-sm text-muted-foreground">
            Improve search engine visibility.
          </p>
        </div>

        <FormField
          label="Meta Title"
          error={errors.metaTitle}
        >
          <input
            {...register("metaTitle")}
            className="w-full rounded-md border px-3 py-2"
          />
        </FormField>

        <FormField
          label="Meta Description"
          error={errors.metaDescription}
        >
          <textarea
            rows={4}
            {...register("metaDescription")}
            className="w-full rounded-md border px-3 py-2"
          />
        </FormField>
      </section>

      <div className="flex items-center gap-3 pt-6">
        <Button
          type="submit"
          disabled={loading || !isDirty}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={loading}
        >
          Reset
        </Button>

      </div>
    </form>
  );
}