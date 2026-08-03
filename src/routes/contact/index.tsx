import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { ContactPage } from "../../features/contact/pages";

const contactSearchSchema = z.object({
  productId: z.string().optional(),
});

function ContactRoutePage() {
  useDocumentTitle("Contact Us");

  return <ContactPage />;
}

export const Route = createFileRoute("/contact/")({
  validateSearch: contactSearchSchema,
  component: ContactRoutePage,
});