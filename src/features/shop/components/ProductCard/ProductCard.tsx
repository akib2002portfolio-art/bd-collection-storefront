import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";

import { PlaceholderImage } from "../../../../components/ui/placeholder-image";
import { formatPrice } from "../../../../lib/format";
import { cn } from "../../../../lib/utils";

import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  aspect?: string;
  className?: string;
}

export function ProductCard({
  product,
  aspect = "4/5",
  className,
}: ProductCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <motion.article
      layout
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        className,
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        to="/product/$slug"
        params={{
          slug: product.slug,
        }}
        className="block"
      >
        <div className="relative overflow-hidden rounded-2xl bg-muted">
          {(product.newArrival || product.featured) && (
            <div className="absolute left-3 top-3 z-20 flex gap-2">
              {product.newArrival && (
                <span className="rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                  New
                </span>
              )}

              {!product.newArrival && product.featured && (
                <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground">
                  Featured
                </span>
              )}
            </div>
          )}

          <motion.div
            animate={{
              scale: hover ? 1.06 : 1,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            ) : (
              <PlaceholderImage
                label={product.name}
                aspect={aspect}
              />
            )}
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              opacity: hover ? 1 : 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="absolute inset-0 bg-black/15"
          />

          <motion.div
            initial={false}
            animate={{
              opacity: hover ? 1 : 0,
              y: hover ? 0 : 12,
            }}
            transition={{
              duration: 0.3,
            }}
            className="absolute inset-x-4 bottom-4"
          >
            <div className="flex h-11 items-center justify-center rounded-xl bg-white font-medium text-sm shadow-lg">
              View Details
            </div>
          </motion.div>
        </div>

        <div className="space-y-2 px-1 pt-5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {product.categoryName}
          </p>

          <h3 className="line-clamp-2 text-base font-semibold leading-6 transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          {product.price !== null && product.currency !== null && (
            <p className="pt-1 text-lg font-semibold">
              {formatPrice(product.price, product.currency)}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}