import { createFileRoute } from "@tanstack/react-router";

import { AboutAdminPage } from "../../features/admin/about/pages";

export const Route = createFileRoute(
  "/admin/about",
)({
  component: AboutRoute,
});

function AboutRoute() {
  return <AboutAdminPage />;
}