import { heroSlides } from "../../../../data/home/hero";

import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { HeroControls } from "./HeroControls";
import { useHeroSlider } from "./useHeroSlider";

export function Hero() {
  const {
    currentIndex,
    goToSlide,
  } = useHeroSlider({
    totalSlides: heroSlides.length,
  });

  const currentSlide = heroSlides[currentIndex];

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