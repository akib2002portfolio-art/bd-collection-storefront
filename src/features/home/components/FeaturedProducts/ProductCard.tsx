import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";

import { formatPrice } from "../../../../lib/format";
import type { ProductPreview } from "../../types/home";

interface ProductCardProps {
  product: ProductPreview;
}

export function ProductCard({ product }: ProductCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <motion.article
      layout
      className="group relative overflow-hidden rounded-2xl"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-muted">
          {product.isNew && (
            <span className="absolute left-3 top-3 z-20 rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
              New
            </span>
          )}

          <motion.img
            src={product.thumbnail}
            alt={product.name}
            animate={{ scale: hover ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/5] w-full object-cover"
          />

          <motion.div
            initial={false}
            animate={{ opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/15"
          />

          <motion.div
            initial={false}
            animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 12 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-4 bottom-4"
          >
            <div className="flex h-11 items-center justify-center rounded-xl bg-white text-sm font-medium shadow-lg">
              View Details
            </div>
          </motion.div>
        </div>

        <div className="mt-5 space-y-2 px-1">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {product.category}
          </p>

          <h3 className="line-clamp-2 text-base font-semibold leading-6 transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          {product.price !== null && product.currency !== null && (
            <div className="flex items-center gap-3 pt-1">
              {product.salePrice ? (
                <>
                  <span className="text-lg font-semibold">
                    {formatPrice(product.salePrice, product.currency)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.price, product.currency)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-semibold">
                  {formatPrice(product.price, product.currency)}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}