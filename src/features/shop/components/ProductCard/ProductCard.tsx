import { memo } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { PlaceholderImage } from "../../../../components/ui/placeholder-image";
import { formatPrice } from "../../../../lib/format";
import { cn } from "../../../../lib/utils";

import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  aspect?: string;
  className?: string;
  index?: number;
}

export const ProductCard = memo(function ProductCard({
  product,
  aspect = "4/5",
  className,
  index = 0,
}: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index, 6) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileTap={{ scale: 0.97 }}
      className={cn("group relative overflow-hidden rounded-2xl", className)}
    >
      <Link
        to="/product/$slug"
        params={{
          slug: product.slug,
        }}
        preload="intent"
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

          <div className="overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className={cn(
                  "aspect-[4/5] w-full object-cover",
                  "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "group-hover:scale-[1.06]",
                )}
              />
            ) : (
              <PlaceholderImage
                label={product.name}
                aspect={aspect}
              />
            )}
          </div>

          <div
            className={cn(
              "absolute inset-0 bg-black/0 transition-colors duration-300",
              "group-hover:bg-black/15",
            )}
          />

          <div
            className={cn(
              "absolute inset-x-4 bottom-4 opacity-100 translate-y-0 transition-all duration-300",
              "lg:opacity-0 lg:translate-y-3 lg:group-hover:opacity-100 lg:group-hover:translate-y-0",
            )}
          >
            <div className="flex h-11 items-center justify-center rounded-xl bg-white font-medium text-sm shadow-lg">
              View Details
            </div>
          </div>
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
});