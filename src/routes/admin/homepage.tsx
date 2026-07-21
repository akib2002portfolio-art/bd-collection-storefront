import { createFileRoute } from "@tanstack/react-router";

import { HeroAdminPage } from "../../features/homepage/pages/HeroAdminPage";

export const Route = createFileRoute(
  "/admin/homepage",
)({
  component: HomepageAdminRoute,
});

function HomepageAdminRoute() {
  return <HeroAdminPage />;
}