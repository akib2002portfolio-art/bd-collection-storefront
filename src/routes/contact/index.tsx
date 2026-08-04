import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { useSeoMetadata } from "../../hooks/useSeoMetadata";
import { ContactPage } from "../../features/contact/pages";

const contactSearchSchema = z.object({
  productId: z.string().optional(),
});

function ContactRoutePage() {
  useSeoMetadata({
    title: "Contact Us | BD Collection",
    description: "Get in touch with BD Collection for orders, support, and inquiries. We're here to help with your fashion needs.",
    canonical: "/contact",
  });

  return <ContactPage />;
}

export const Route = createFileRoute("/contact/")({
  validateSearch: contactSearchSchema,
  component: ContactRoutePage,
});