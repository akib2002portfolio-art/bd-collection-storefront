import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { HERO_ANIMATION } from "./constants";
import type { HeroSlide } from "../../types/home";

interface HeroContentProps {
  slide: HeroSlide;
}

export function HeroContent({
  slide,
}: HeroContentProps) {
  return (
    <motion.div
      key={slide.id}
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -8,
      }}
      transition={{
        duration: HERO_ANIMATION.CONTENT.FADE_DURATION,
        ease: "easeOut",
      }}
      className="max-w-4xl"
    >
      <motion.p
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: HERO_ANIMATION.CONTENT.START_DELAY,
          duration: HERO_ANIMATION.CONTENT.FADE_DURATION,
          ease: "easeOut",
        }}
        className="text-sm uppercase tracking-[0.3em] text-white/70"
      >
        {slide.eyebrow}
      </motion.p>

      <motion.h1
        initial={{
          opacity: 0,
          y: 24,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay:
            HERO_ANIMATION.CONTENT.START_DELAY +
            HERO_ANIMATION.CONTENT.STAGGER,
          duration: HERO_ANIMATION.CONTENT.FADE_DURATION,
          ease: "easeOut",
        }}
        className="mt-5 text-5xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl"
      >
        {slide.title}
      </motion.h1>

      <motion.p
        initial={{
          opacity: 0,
          y: 24,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay:
            HERO_ANIMATION.CONTENT.START_DELAY +
            HERO_ANIMATION.CONTENT.STAGGER * 2,
          duration: HERO_ANIMATION.CONTENT.FADE_DURATION,
          ease: "easeOut",
        }}
        className="mt-6 max-w-xl text-base leading-7 text-white/80"
      >
        {slide.description}
      </motion.p>

      <motion.div
        initial={{
          opacity: 0,
          y: 24,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay:
            HERO_ANIMATION.CONTENT.START_DELAY +
            HERO_ANIMATION.CONTENT.STAGGER * 3,
          duration: HERO_ANIMATION.CONTENT.FADE_DURATION,
          ease: "easeOut",
        }}
        className="mt-10"
      >
        <Link
          to={slide.ctaHref}
          className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black"
        >
          {slide.ctaLabel}

          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.div>
  );
}