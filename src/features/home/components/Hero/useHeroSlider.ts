import { useCallback, useEffect, useState } from "react";

interface UseHeroSliderOptions {
  totalSlides: number;
  autoPlay?: boolean;
  interval?: number;
}

export function useHeroSlider({
  totalSlides,
  autoPlay = true,
  interval = 7000,
}: UseHeroSliderOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const previousSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!autoPlay || totalSlides <= 1) return;

    const timer = window.setInterval(nextSlide, interval);

    return () => window.clearInterval(timer);
  }, [autoPlay, interval, nextSlide, totalSlides]);

  return {
    currentIndex,
    nextSlide,
    previousSlide,
    goToSlide,
  };
}