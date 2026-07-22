import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import { AdminLayout } from "../../features/admin/shared";

import { HeroSlideForm } from "../../features/homepage/components/HeroSlideForm";

import {
  useCreateHeroSlide,
} from "../../features/homepage/hooks";

import type {
  HeroSlideFormData,
} from "../../features/homepage/types";

export const Route = createFileRoute(
  "/admin/new-hero",
)({
  component: NewHeroPage,
});

function NewHeroPage() {
  const navigate = useNavigate();

  const createHero =
    useCreateHeroSlide();

  async function handleSubmit(
    values: HeroSlideFormData,
  ) {
    try {
      await createHero.mutateAsync(
        values,
      );

      alert(
        "Hero slide created successfully.",
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
          "Failed to create hero slide.",
        );
      }
    }
  }

  function handleCancel() {
    navigate({
      to: "/admin/homepage",
    });
  }

  return (
    <AdminLayout
      title="New Hero Slide"
      subtitle="Create a homepage hero slide"
    >
      <div className="rounded-xl border border-hairline bg-canvas p-6">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="font-display text-2xl text-ink">
              New Hero Slide
            </h2>

            <p className="mt-1 text-sm text-taupe">
              Create a new homepage hero.
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
          loading={
            createHero.isPending
          }
          onSubmit={handleSubmit}
        />
      </div>
    </AdminLayout>
  );
}