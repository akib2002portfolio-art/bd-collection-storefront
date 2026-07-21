import { useMemo } from "react";

import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { HeroControls } from "./HeroControls";
import { useHeroSlider } from "./useHeroSlider";

import { useHeroSlides } from "../../../homepage/hooks";
import { mapHeroToStorefront } from "../../../homepage/utils/mapHeroToStorefront";

export function Hero() {
  const {
    data,
    isLoading,
    isError,
  } = useHeroSlides();

  const heroSlides = useMemo(() => {
    if (!data) return [];

    return data
      .filter((slide) => slide.isActive)
      .sort(
        (a, b) =>
          a.displayOrder - b.displayOrder,
      )
      .map(mapHeroToStorefront);
  }, [data]);

  const {
    currentIndex,
    goToSlide,
  } = useHeroSlider({
    totalSlides:
      heroSlides.length > 0
        ? heroSlides.length
        : 1,
  });

  if (isLoading) {
    return (
      <section className="relative flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-white/70">
          Loading homepage...
        </p>
      </section>
    );
  }

  if (
    isError ||
    heroSlides.length === 0
  ) {
    return null;
  }

  const currentSlide =
    heroSlides[currentIndex];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <HeroBackground slide={currentSlide} />

      <div className="relative z-10 flex min-h-screen flex-col justify-end pb-20 pt-32">
        <div className="container mx-auto w-full max-w-7xl px-6">
          <HeroContent slide={currentSlide} />

          <HeroControls
            slides={heroSlides}
            currentIndex={currentIndex}
            onSlideChange={goToSlide}
          />
        </div>
      </div>
    </section>
  );
}