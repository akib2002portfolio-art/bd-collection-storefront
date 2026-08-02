import { useNavigate } from "@tanstack/react-router";

import type { HeroSlide } from "../../types";

interface HeroSlideCardProps {
  slide: HeroSlide;
  onDelete: (slide: HeroSlide) => Promise<void>;
}

export function HeroSlideCard({ slide, onDelete }: HeroSlideCardProps) {
  const navigate = useNavigate();

  function handleEdit() {
    navigate({
      to: "/admin/edit-hero/$id",
      params: { id: slide.id },
    });
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${slide.title}"?\n\nThis action cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      await onDelete(slide);
      alert("Hero slide deleted successfully.");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to delete hero slide.",
      );
    }
  }

  return (
    <div className="rounded-xl border border-hairline bg-canvas p-4 shadow-sm">
      <div className="flex gap-4">
        <img
          src={slide.imageUrl ?? "https://placehold.co/120x80?text=No+Image"}
          alt={slide.title}
          className="h-16 w-24 shrink-0 rounded-lg border border-hairline object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-ink">{slide.title}</p>
          <p className="truncate text-sm text-taupe">{slide.subtitle || "-"}</p>
        </div>

        <span
          className={`h-fit shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            slide.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {slide.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3">
        <span className="text-xs text-taupe">Order: {slide.displayOrder}</span>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleEdit}
            className="text-sm text-ink transition hover:underline"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="text-sm text-red-600 transition hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
