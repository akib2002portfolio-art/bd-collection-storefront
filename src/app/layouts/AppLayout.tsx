import { useEffect, useLayoutEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { useRouterState } from "@tanstack/react-router";

import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { LoadingScreen } from "../../components/layout/LoadingScreen";
import { SeoProvider } from "../../components/providers/SeoProvider";
import { SiteBrandingProvider } from "../../components/providers/SiteBrandingProvider";
import { AnalyticsProvider } from "../../components/providers/AnalyticsProvider";
import { useSiteSettings } from "../../features/settings/hooks";

export default function AppLayout({
  children,
}: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const { data: settings } = useSiteSettings();

  const isHomePage = pathname === "/";
  const isAdminRoute = pathname.startsWith("/admin");

  useLayoutEffect(() => {
    document.title = settings?.storeName || "BD Collection";
  }, [pathname, settings]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <SeoProvider>
      <SiteBrandingProvider />
      <AnalyticsProvider />

      <LoadingScreen isLoading={isLoading} />

      {isAdminRoute ? (
        <main className="min-h-screen bg-background">
          {children}
        </main>
      ) : (
        <div className="relative min-h-screen bg-background text-foreground">
          <Header />

          <main
            className={
              isHomePage
                ? "flex-1"
                : "flex-1 pt-20"
            }
          >
            {children}
          </main>

          <Footer />
        </div>
      )}
    </SeoProvider>
  );
}