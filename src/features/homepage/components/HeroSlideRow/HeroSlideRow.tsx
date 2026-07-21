import type { HeroSlide } from "../../types";

interface HeroSlideRowProps {
  slide: HeroSlide;
  onEdit: (slide: HeroSlide) => void;
  onDelete: (slide: HeroSlide) => void;
}

export function HeroSlideRow({
  slide,
  onEdit,
  onDelete,
}: HeroSlideRowProps) {
  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${slide.title}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await onDelete(slide);

      alert("Hero slide deleted successfully.");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to delete hero slide.");
      }
    }
  }

  return (
    <tr className="border-b border-hairline transition hover:bg-bone">
      <td className="px-6 py-4">
        <img
          src={
            slide.imageUrl ??
            "https://placehold.co/120x80?text=No+Image"
          }
          alt={slide.title}
          className="h-16 w-24 rounded-lg border border-hairline object-cover"
        />
      </td>

      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-ink">
            {slide.title}
          </p>

          <p className="mt-1 text-sm text-taupe">
            {slide.subtitle || "-"}
          </p>
        </div>
      </td>

      <td className="px-6 py-4">
        {slide.displayOrder}
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            slide.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {slide.isActive ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => onEdit(slide)}
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
      </td>
    </tr>
  );
}