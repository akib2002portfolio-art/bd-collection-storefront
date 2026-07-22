import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import { AdminLayout } from "../../../features/admin/shared";

import { HeroSlideForm } from "../../../features/homepage/components/HeroSlideForm";

import {
  useHeroSlide,
  useUpdateHeroSlide,
} from "../../../features/homepage/hooks";

import type {
  HeroSlideFormData,
} from "../../../features/homepage/types";

export const Route = createFileRoute(
  "/admin/edit-hero/$id",
)({
  component: EditHeroPage,
});

function EditHeroPage() {
  const { id } = Route.useParams();

  const navigate = useNavigate();

  const {
    data: hero,
    isLoading,
    error,
  } = useHeroSlide(id);

  const updateHero =
    useUpdateHeroSlide();

  async function handleSubmit(
    values: HeroSlideFormData,
  ) {
    try {
      await updateHero.mutateAsync({
        id,
        hero: values,
      });

      alert(
        "Hero slide updated successfully.",
      );

      navigate({
        to: "/admin/homepage",
      });
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(
          "Failed to update hero slide.",
        );
      }
    }
  }

  function handleCancel() {
    navigate({
      to: "/admin/homepage",
    });
  }

  if (isLoading) {
    return (
      <AdminLayout
        title="Edit Hero Slide"
      >
        <div className="rounded-xl border border-hairline bg-canvas p-8 text-center">
          Loading hero slide...
        </div>
      </AdminLayout>
    );
  }

  if (error || !hero) {
    return (
      <AdminLayout
        title="Edit Hero Slide"
      >
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
          Hero slide not found.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Edit Hero Slide"
      subtitle="Update homepage hero"
    >
      <div className="rounded-xl border border-hairline bg-canvas p-6">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="font-display text-2xl text-ink">
              Edit Hero Slide
            </h2>

            <p className="mt-1 text-sm text-taupe">
              Update this homepage hero.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md border border-hairline px-4 py-2 text-sm hover:bg-bone"
          >
            Cancel
          </button>

        </div>

        <HeroSlideForm
          initialValues={hero}
          loading={
            updateHero.isPending
          }
          onSubmit={handleSubmit}
        />
      </div>
    </AdminLayout>
  );
}