import type { HeroSlide } from "../../types";
import { HeroSlideRow } from "../HeroSlideRow/HeroSlideRow";

interface HeroSlideTableProps {
  slides: HeroSlide[];
  loading: boolean;
  error: string | null;
  onDelete: (slide: HeroSlide) => Promise<void>;
}

export function HeroSlideTable({
  slides,
  loading,
  error,
  onDelete,
}: HeroSlideTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-hairline bg-canvas p-8 text-center">
        Loading hero slides...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="rounded-xl border border-hairline bg-canvas p-10 text-center">
        <h2 className="font-display text-3xl text-ink">
          No Hero Slides Yet
        </h2>

        <p className="mt-3 text-taupe">
          Create your first homepage hero slide.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-hairline bg-canvas shadow-sm">
      <table className="min-w-full">
        <thead className="border-b border-hairline bg-bone">
          <tr className="text-left text-xs uppercase tracking-[0.22em] text-taupe">
            <th className="px-6 py-5">
              Image
            </th>

            <th className="px-6 py-5">
              Title
            </th>

            <th className="px-6 py-5">
              Order
            </th>

            <th className="px-6 py-5">
              Status
            </th>

            <th className="px-6 py-5 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {slides.map((slide) => (
            <HeroSlideRow
              key={slide.id}
              slide={slide}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}