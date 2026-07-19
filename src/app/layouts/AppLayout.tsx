import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { useRouterState } from "@tanstack/react-router";

import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { LoadingScreen } from "../../components/layout/LoadingScreen";

export default function AppLayout({
  children,
}: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isHomePage = pathname === "/";
  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
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
    </>
  );
}