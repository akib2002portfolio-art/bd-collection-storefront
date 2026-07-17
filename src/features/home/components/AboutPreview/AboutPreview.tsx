import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { aboutPreview } from "../../../../data/home/about";

export function AboutPreview() {
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
            About Us
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            {aboutPreview.title}
          </h2>

          <p className="mt-6 text-muted-foreground leading-8">
            {aboutPreview.description}
          </p>

          <Link
            to={aboutPreview.buttonLink}
            className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            {aboutPreview.buttonText}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={aboutPreview.image}
            alt="About BD Collection"
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}