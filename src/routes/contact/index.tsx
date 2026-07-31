import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "../../features/contact/pages";

export const Route = createFileRoute("/contact/")({
  component: ContactPage,
});