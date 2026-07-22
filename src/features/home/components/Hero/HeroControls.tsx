import type { HeroSlide } from "../../types/home";

interface HeroControlsProps {
  slides: HeroSlide[];
  currentIndex: number;
  onSlideChange: (index: number) => void;
}

export function HeroControls({
  slides,
  currentIndex,
  onSlideChange,
}: HeroControlsProps) {
  return (
    <div className="mt-14 flex items-center justify-between text-xs text-white/70">
      <div className="flex items-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => onSlideChange(index)}
            className="group flex items-center gap-2"
          >
            <span
              className={`h-px transition-all duration-300 ${
                currentIndex === index
                  ? "w-14 bg-white"
                  : "w-6 bg-white/30"
              }`}
            />

            <span
              className={
                currentIndex === index
                  ? "text-white"
                  : "text-white/60"
              }
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      <p className="hidden md:block">
        Scroll to explore ↓
      </p>
    </div>
  );
}