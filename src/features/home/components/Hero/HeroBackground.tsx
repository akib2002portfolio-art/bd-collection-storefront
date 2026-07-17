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
                    scale: 1.08,
                }}

                animate={{
                    opacity: 1,
                    scale: 1.02,
                }}
                exit={{
                    opacity: 0,
                }}
                transition={{
                    duration: 8,
                    ease: "easeOut",
                }}
            >
                <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/45 to-black/80" />
            </motion.div>
        </AnimatePresence>
    );
}