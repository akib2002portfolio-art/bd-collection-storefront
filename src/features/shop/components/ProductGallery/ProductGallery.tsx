import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { PlaceholderImage } from "../../../../components/ui/placeholder-image";
import { cn } from "../../../../lib/utils";

interface ProductGalleryProps {
  productName: string;
  imageUrl?: string;
  images?: string[];
}

export function ProductGallery({
  productName,
  imageUrl,
  images = [],
}: ProductGalleryProps) {
  const gallery =
    images.length > 0
      ? images
      : imageUrl
        ? [imageUrl]
        : [];

  const [current, setCurrent] = useState(0);

  const hasImages = gallery.length > 0;

  return (
    <div className="grid gap-5 lg:grid-cols-[100px_1fr]">
      {/* Thumbnails */}
      <div className="order-2 flex gap-3 lg:order-1 lg:flex-col">
        {hasImages ? (
          gallery.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`View image ${index + 1}`}
              className={cn(
                "overflow-hidden rounded-xl border bg-background transition-all duration-300",
                current === index
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/40"
              )}
            >
              <img
                src={src}
                alt={`${productName} ${index + 1}`}
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </button>
          ))
        ) : (
          <PlaceholderImage
            label={productName}
            aspect="4/5"
          />
        )}
      </div>

      {/* Main Image */}
      <div className="order-1 overflow-hidden rounded-2xl bg-muted lg:order-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={gallery[current] ?? "placeholder"}
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {hasImages ? (
              <img
                src={gallery[current]}
                alt={productName}
                className="aspect-[4/5] w-full object-cover"
              />
            ) : (
              <PlaceholderImage
                label={productName}
                aspect="4/5"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}