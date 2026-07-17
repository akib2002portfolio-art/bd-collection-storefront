import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import type { ProductPreview } from "../../types/home";

interface ProductCardProps {
  product: ProductPreview;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <motion.article
        whileHover={{ y: -6 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="overflow-hidden rounded-3xl"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <motion.img
            src={product.thumbnail}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {product.isNew && (
            <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
              New
            </span>
          )}
        </div>

        <div className="mt-5">
          <p className="text-sm text-muted-foreground">
            {product.category}
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            {product.name}
          </h3>

          <div className="mt-3 flex items-center gap-3">
            {product.salePrice ? (
              <>
                <span className="text-lg font-semibold">
                  ৳{product.salePrice}
                </span>

                <span className="text-sm text-muted-foreground line-through">
                  ৳{product.price}
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold">
                ৳{product.price}
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}