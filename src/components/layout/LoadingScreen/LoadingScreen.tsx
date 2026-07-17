import { AnimatePresence, motion } from "framer-motion";

import { siteConfig } from "../../../data/site";

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({
  isLoading,
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <h1 className="text-3xl font-bold tracking-[0.2em] uppercase">
                {siteConfig.brand.prefix}
              </h1>

              <p className="text-lg tracking-[0.35em] uppercase text-muted-foreground">
                {siteConfig.brand.suffix}
              </p>
            </motion.div>

            <motion.div className="h-1 w-40 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full w-full bg-primary"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}