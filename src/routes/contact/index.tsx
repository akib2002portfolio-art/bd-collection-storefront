import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { ContactPage } from "../../features/contact/pages";

const contactSearchSchema = z.object({
  productId: z.string().optional(),
});

export const Route = createFileRoute("/contact/")({
  validateSearch: contactSearchSchema,

  component: ContactPage,
});