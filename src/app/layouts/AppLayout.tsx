import type { PropsWithChildren } from "react";

import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { LoadingScreen } from "../../components/layout/LoadingScreen";
import { MobileMenu } from "../../components/layout/MobileMenu";
import { SearchOverlay } from "../../components/layout/SearchOverlay";

export default function AppLayout({
  children,
}: PropsWithChildren) {
  return (
    <>
      <LoadingScreen />

      <div className="relative min-h-screen bg-background text-foreground">
        <Header />

        <main className="flex-1 pt-16 lg:pt-20">
          {children}
        </main>

        <Footer />
      </div>

      <MobileMenu />
      <SearchOverlay />
    </>
  );
}