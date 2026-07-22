import { useNavigate } from "@tanstack/react-router";

import { AdminLayout } from "../../admin/shared";

import { HeroToolbar } from "../components/HeroToolbar/HeroToolbar";
import { HeroSlideTable } from "../components/HeroSlideTable/HeroSlideTable";

import {
  useHeroSlides,
  useDeleteHeroSlide,
} from "../hooks";

import type {
  HeroSlide,
} from "../types";

export function HeroAdminPage() {
  const navigate = useNavigate();

  const {
    data: slides = [],
    isLoading,
    error,
  } = useHeroSlides();

  const deleteHero =
    useDeleteHeroSlide();

  function handleAddHero() {
    navigate({
      to: "/admin/new-hero",
    });
  }

  async function handleDelete(
    slide: HeroSlide,
  ) {
    await deleteHero.mutateAsync(
      slide.id,
    );
  }

  return (
    <AdminLayout
      title="Homepage"
      subtitle="Manage homepage hero slides"
    >
      <div className="space-y-6">

        <HeroToolbar
          heroCount={slides.length}
          onAddHero={handleAddHero}
        />

        <HeroSlideTable
          slides={slides}
          loading={isLoading}
          error={
            error instanceof Error
              ? error.message
              : null
          }
          onDelete={handleDelete}
        />

      </div>
    </AdminLayout>
  );
}