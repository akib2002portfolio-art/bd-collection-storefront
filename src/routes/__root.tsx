import { Outlet, createRootRoute } from "@tanstack/react-router";
import AppLayout from "../app/layouts/AppLayout";

function RootComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});