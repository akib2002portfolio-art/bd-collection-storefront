import { Loader2 } from "lucide-react";

import { AdminLayout } from "../../shared";

import {
  useAbout,
  useUpdateAbout,
} from "../../../about/hooks";

import { AboutForm } from "../components";

export function AboutAdminPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useAbout();

  const updateMutation =
    useUpdateAbout();

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div>
        {error instanceof Error
          ? error.message
          : "Unknown Error"}
      </div>
    );
  }

  return (
    <AdminLayout
      title="About Page"
      subtitle="Manage About Page Content"
    >
      <AboutForm
        initialValues={{
          eyebrow:
            data.eyebrow ?? "",

          title: data.title,

          shortDescription:
            data.shortDescription ?? "",

          story:
            data.story ?? "",

          mission:
            data.mission ?? "",

          vision:
            data.vision ?? "",

          heroImage:
            data.heroImage ?? "",

          secondaryImage:
            data.secondaryImage ?? "",

          yearsExperience:
            data.yearsExperience,

          happyCustomers:
            data.happyCustomers,

          productsCount:
            data.productsCount,

          metaTitle:
            data.metaTitle ?? "",

          metaDescription:
            data.metaDescription ??
            "",
        }}
        loading={
          updateMutation.isPending
        }
        onSubmit={async (
          values,
        ) => {
          await updateMutation.mutateAsync(
            {
              id: data.id,
              about: values,
            },
          );
        }}
      />
    </AdminLayout>
  );
}