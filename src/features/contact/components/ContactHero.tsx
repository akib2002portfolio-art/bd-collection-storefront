import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-background to-background" />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.35em] text-primary"
        >
          CONTACT US
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        >
          We'd Love To Hear From You
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .15 }}
          className="mx-auto mt-8 max-w-xl text-lg leading-8 text-muted-foreground"
        >
          Whether you have a question about a product,
          need assistance with an order,
          or simply want to get in touch,
          our team is always ready to help.
        </motion.p>
      </div>
    </section>
  );
}