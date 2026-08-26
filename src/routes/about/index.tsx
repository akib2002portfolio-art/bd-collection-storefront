import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { useSeoMetadata } from "../../hooks/useSeoMetadata";
import { useAbout } from "../../features/about/hooks";

export const Route = createFileRoute("/about/")({
  component: AboutPage,
});

function AboutPage() {
  useSeoMetadata({
    title: "About | BD Collection",
    description: "Learn about BD Collection's story, mission, and vision. Discover premium fashion crafted for modern lifestyles.",
    canonical: "/about",
  });

  const {
    data: about,
    isLoading,
    isError,
  } = useAbout();

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="h-[700px] animate-pulse rounded-3xl bg-muted" />
        </div>
      </section>
    );
  }

  if (isError || !about) {
    return (
      <section className="py-24 text-center">
        Failed to load About page.
      </section>
    );
  }

  return (
    <main>

      {/* HERO */}

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
          >

            <p className="uppercase tracking-[0.3em] text-sm text-muted-foreground">
              {about.eyebrow}
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight">
              {about.title}
            </h1>

            <p className="mt-8 text-lg leading-8 text-muted-foreground">
              {about.shortDescription}
            </p>

            <div className="mt-10 flex gap-4">

              <Link
                to="/shop"
                className="rounded-full bg-black px-6 py-3 text-white"
              >
                View Products
              </Link>

              <Link
                to="/contact"
                className="rounded-full border px-6 py-3"
              >
                Contact Us
              </Link>

            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
          >

            <img
              src={
                about.heroImage ??
                "/images/about/about-preview.jpg"
              }
              alt={about.title}
              className="aspect-[4/5] w-full rounded-3xl object-cover"
            />

          </motion.div>

        </div>
      </section>

      {/* STORY */}

      <section className="py-24 bg-muted/30">

        <div className="mx-auto max-w-5xl px-6 space-y-10">

          <h2 className="text-4xl font-bold">
            Our Story
          </h2>

          <p className="leading-8 text-muted-foreground whitespace-pre-line">
            {about.story}
          </p>

          <div className="grid gap-8 md:grid-cols-2">

            <div>
              <h3 className="mb-3 text-2xl font-semibold">
                Mission
              </h3>

              <p className="leading-8 text-muted-foreground whitespace-pre-line">
                {about.mission}
              </p>

            </div>

            <div>

              <h3 className="mb-3 text-2xl font-semibold">
                Vision
              </h3>

              <p className="leading-8 text-muted-foreground whitespace-pre-line">
                {about.vision}
              </p>

            </div>

          </div>

        </div>

      </section>
      {/* SECONDARY IMAGE */}

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="relative overflow-hidden rounded-3xl">

            <img
              src={
                about.secondaryImage ??
                "/images/about/about-secondary.jpg"
              }
              alt="Our Story"
              className="h-[600px] w-full object-cover"
            />

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-black/45" />

            {/* Content */}

            <div className="absolute inset-0 flex items-center">

              <div className="max-w-2xl px-10 md:px-16 text-white">

                <p className="mb-4 uppercase tracking-[0.35em] text-sm text-white/80">
                  BD Collection
                </p>

                <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                  Fashion isn't just what you wear.
                  <br />
                  It's how you express yourself.
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
                  Every piece is thoughtfully crafted with premium fabrics,
                  modern silhouettes, and timeless elegance to help you look
                  confident every single day.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">

                  <Link
                    to="/shop"
                    className="rounded-full bg-white px-7 py-3 font-medium text-black transition hover:bg-neutral-100"
                  >
                    Product Collection
                  </Link>

                  <Link
                    to="/contact"
                    className="rounded-full border border-white px-7 py-3 font-medium text-white transition hover:bg-white hover:text-black"
                  >
                    Contact Us
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
      {/* STATS */}

      <section className="py-24">

        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3">

          <Stat
            value={about.yearsExperience}
            label="Years Experience"
          />

          <Stat
            value={about.happyCustomers}
            label="Happy Customers"
          />

          <Stat
            value={about.productsCount}
            label="Products"
          />

        </div>

      </section>

    </main>
  );
}

function Stat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-3xl border p-10 text-center">

      <h2 className="text-5xl font-bold">
        {value}+
      </h2>

      <p className="mt-3 text-muted-foreground">
        {label}
      </p>

    </div>
  );
}