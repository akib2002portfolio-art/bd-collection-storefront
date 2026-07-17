import { AnimatePresence, motion } from "framer-motion";

import type { HeroSlide } from "../../types/home";

interface HeroBackgroundProps {
  slide: HeroSlide;
}

export function HeroBackground({
  slide,
}: HeroBackgroundProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.id}
        className="absolute inset-0"
        initial={{
          opacity: 0,
          scale: 1.05,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/75" />
      </motion.div>
    </AnimatePresence>
  );
}