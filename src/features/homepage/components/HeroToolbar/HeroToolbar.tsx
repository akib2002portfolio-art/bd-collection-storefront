interface HeroToolbarProps {
  heroCount: number;
  onAddHero: () => void;
}

export function HeroToolbar({
  heroCount,
  onAddHero,
}: HeroToolbarProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <p className="eyebrow">
          {heroCount}{" "}
          {heroCount === 1
            ? "Hero Slide"
            : "Hero Slides"}
        </p>
      </div>

      <button
        type="button"
        onClick={onAddHero}
        className="rounded-md bg-ink px-5 py-3 text-xs uppercase tracking-[0.22em] text-canvas transition hover:bg-sienna"
      >
        Add Hero
      </button>
    </div>
  );
}