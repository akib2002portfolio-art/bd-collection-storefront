import { useCallback, useEffect, useRef, useState } from "react";

import { HERO_ANIMATION } from "./constants";

interface UseHeroSliderOptions {
  totalSlides: number;
  autoPlay?: boolean;
  interval?: number;
}

export function useHeroSlider({
  totalSlides,
  autoPlay = true,
  interval = HERO_ANIMATION.AUTOPLAY_INTERVAL,
}: UseHeroSliderOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [resetKey, setResetKey] = useState(0);

  const isMounted = useRef(false);

  const restartAutoplay = useCallback(() => {
    setResetKey((prev) => prev + 1);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);

    if (isMounted.current) {
      restartAutoplay();
    }
  }, [restartAutoplay, totalSlides]);

  const previousSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1,
    );

    if (isMounted.current) {
      restartAutoplay();
    }
  }, [restartAutoplay, totalSlides]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);

      if (isMounted.current) {
        restartAutoplay();
      }
    },
    [restartAutoplay],
  );

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!autoPlay || totalSlides <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, interval);

    return () => window.clearInterval(timer);
  }, [autoPlay, interval, totalSlides, resetKey]);

  return {
    currentIndex,
    nextSlide,
    previousSlide,
    goToSlide,
  };
}