import { createFileRoute } from "@tanstack/react-router";

import { SiteSettingsPage } from "../../features/settings/pages";

export const Route = createFileRoute(
  "/admin/settings",
)({
  component: SettingsRoute,
});

function SettingsRoute() {
  return <SiteSettingsPage />;
}