import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";

import { formatPrice } from "../../../../lib/format";
import { cn } from "../../../../lib/utils";
import { PlaceholderImage } from "../../../../components/ui/placeholder-image";

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
    <div
      className={cn("group relative", className)}
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
        <div className="relative overflow-hidden rounded-xl">
          <motion.div
            animate={{
              scale: hover ? 1.03 : 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                className="aspect-[4/5] h-full w-full object-cover"
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
              y: hover ? 0 : 20,
            }}
            transition={{
              duration: 0.3,
            }}
            className="absolute inset-x-3 bottom-3 flex h-11 items-center justify-center rounded-lg bg-black text-xs font-medium uppercase tracking-[0.22em] text-white"
          >
            View Details
          </motion.div>
        </div>

        <div className="mt-4">
          <h3 className="truncate text-base font-medium">
            {product.name}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}