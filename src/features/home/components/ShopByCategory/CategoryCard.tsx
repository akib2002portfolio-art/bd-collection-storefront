import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import type { CategoryCardData } from "../../types/home";

interface CategoryCardProps {
  category: CategoryCardData;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to="/shop/$slug" params={{ slug: category.slug }} className="group block">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition-shadow duration-300 group-hover:shadow-xl"
      >
        <motion.img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 h-full w-full object-cover"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/0 transition-opacity duration-300 group-hover:from-black/90" />

        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">
            Collection
          </p>

          <div className="mt-2 flex items-end justify-between gap-2">
            <h3 className="text-2xl font-semibold leading-tight">{category.name}</h3>

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-black">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-white/75">{category.description}</p>
        </div>
      </motion.article>
    </Link>
  );
}