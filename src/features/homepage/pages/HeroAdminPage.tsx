import { useState } from "react";

import { AdminLayout } from "../../admin/shared";

import { HeroSlideForm } from "../components/HeroSlideForm";
import { HeroSlideTable } from "../components/HeroSlideTable/HeroSlideTable";

import {
  useHeroSlides,
  useCreateHeroSlide,
  useUpdateHeroSlide,
  useDeleteHeroSlide,
} from "../hooks";

import type {
  HeroSlide,
  HeroSlideFormData,
} from "../types";

export function HeroAdminPage() {
  const {
    data: slides = [],
    isLoading,
    error,
  } = useHeroSlides();

  const createHero = useCreateHeroSlide();
  const updateHero = useUpdateHeroSlide();
  const deleteHero = useDeleteHeroSlide();

  const [editingSlide, setEditingSlide] =
    useState<HeroSlide | null>(null);

  async function handleSubmit(
    values: HeroSlideFormData,
  ) {
    try {
      if (editingSlide) {
        await updateHero.mutateAsync({
          id: editingSlide.id,
          hero: values,
        });

        alert("Hero slide updated successfully.");
      } else {
        await createHero.mutateAsync(values);

        alert("Hero slide created successfully.");
      }

      setEditingSlide(null);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to save hero slide.");
      }
    }
  }

  async function handleDelete(
    slide: HeroSlide,
  ) {
    await deleteHero.mutateAsync(slide.id);

    if (
      editingSlide &&
      editingSlide.id === slide.id
    ) {
      setEditingSlide(null);
    }
  }

  function handleEdit(
    slide: HeroSlide,
  ) {
    setEditingSlide(slide);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setEditingSlide(null);
  }

  return (
    <AdminLayout
      title="Homepage"
      subtitle="Manage homepage hero slides"
    >
      <div className="space-y-8">

        <div className="rounded-xl border border-hairline bg-canvas p-6">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className="font-display text-2xl text-ink">
                {editingSlide
                  ? "Edit Hero Slide"
                  : "New Hero Slide"}
              </h2>

              <p className="mt-1 text-sm text-taupe">
                {slides.length} Hero
                {slides.length === 1
                  ? " Slide"
                  : " Slides"}
              </p>
            </div>

            {editingSlide && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-md border border-hairline px-4 py-2 text-sm hover:bg-bone"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <HeroSlideForm
            initialValues={
              editingSlide ?? undefined
            }
            loading={
              createHero.isPending ||
              updateHero.isPending
            }
            onSubmit={handleSubmit}
          />
        </div>

        <HeroSlideTable
          slides={slides}
          loading={isLoading}
          error={
            error instanceof Error
              ? error.message
              : null
          }
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
}