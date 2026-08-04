import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { HERO_ANIMATION } from "./constants";
import type { HeroSlide } from "../../types/home";

interface HeroBackgroundProps {
  slide: HeroSlide;
}

export const HeroBackground = memo(function HeroBackground({
  slide,
}: HeroBackgroundProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.id}
        className="absolute inset-0"
        initial={{
          opacity: 0,
          scale: HERO_ANIMATION.BACKGROUND.INITIAL_SCALE,
        }}
        animate={{
          opacity: 1,
          scale: HERO_ANIMATION.BACKGROUND.FINAL_SCALE,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          opacity: {
            duration: 0.9,
            ease: "easeInOut",
          },
          scale: {
            duration: HERO_ANIMATION.BACKGROUND.DURATION,
            ease: "easeOut",
          },
        }}
      >
        <img
          src={slide.image}
          alt={`${slide.title} hero image`}
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
          draggable={false}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/45 to-black/80" />
      </motion.div>
    </AnimatePresence>
  );
});