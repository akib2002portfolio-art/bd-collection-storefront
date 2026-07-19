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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[96px_1fr]">
      <div className="order-2 flex gap-2 md:order-1 md:flex-col">
        {hasImages ? (
          gallery.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`View image ${index + 1}`}
              className={cn(
                "overflow-hidden border transition-colors",
                current === index
                  ? "border-primary"
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

      <div className="order-1 md:order-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={gallery[current] ?? "placeholder"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {hasImages ? (
              <img
                src={gallery[current]}
                alt={productName}
                className="aspect-[4/5] h-full w-full object-cover"
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