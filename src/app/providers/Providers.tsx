import type { PropsWithChildren } from "react";

/**
 * Global application providers.
 *
 * Future integrations:
 * - Supabase Auth Provider
 * - Theme Provider
 * - React Query Provider
 * - Toast Provider
 * - Analytics
 */
export default function Providers({
  children,
}: PropsWithChildren) {
  return <>{children}</>;
}