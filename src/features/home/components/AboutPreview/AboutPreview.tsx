import { memo } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { useAbout } from "../../../about/hooks";

export const AboutPreview = memo(function AboutPreview() {
  const { data: about, isLoading } = useAbout();

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="h-[420px] animate-pulse rounded-3xl bg-muted" />
        </div>
      </section>
    );
  }
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {about?.eyebrow || "About Us"}
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            {about?.title}
          </h2>

          <p className="mt-6 leading-8 text-muted-foreground">
            {about?.shortDescription}
          </p>

          <Link
            to="/about"
            className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Learn More
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={
              about?.heroImage ??
              "/images/about/about-preview.jpg"
            }
            alt={about?.title ?? "About BD Collection"}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
});