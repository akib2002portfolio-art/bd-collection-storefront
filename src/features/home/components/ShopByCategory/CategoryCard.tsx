import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import type { CategoryCardData } from "../../types/home";

interface CategoryCardProps {
    category: CategoryCardData;
}

export function CategoryCard({
    category,
}: CategoryCardProps) {
    return (
        <Link
            to="/shop"
        >
            <motion.article
                whileHover={{ y: -6 }}
                transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="relative aspect-[4/5] overflow-hidden"
            >
                <motion.img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="text-2xl font-semibold">
                        {category.name}
                    </h3>

                    <p className="mt-2 text-sm text-white/80">
                        {category.description}
                    </p>
                </div>
            </motion.article>
        </Link>
    );
}