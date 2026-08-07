import { useEffect, useRef } from "react";
import { Route } from "../../../routes/contact";

import { ContactHero } from "../components/ContactHero";
import { ContactInfoCards } from "../components/ContactInfoCards";
import { ContactForm } from "../components/ContactForm";
import { ContactSidebar } from "../components/ContactSidebar";
import { ProductInquiryCard } from "../components/ProductInquiryCard";

import { useProductById } from "../../shop/hooks/useProductById";

export function ContactPage() {
  const { productId = "" } = Route.useSearch();
  const inquirySectionRef = useRef<HTMLDivElement | null>(null);

  const {
    data: product,
    isLoading,
    isError,
  } = useProductById(productId);

  useEffect(() => {
    if (!productId || !inquirySectionRef.current) {
      return;
    }

    if (isLoading) {
      return;
    }

    const element = inquirySectionRef.current;
    const headerOffset = 96;
    const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });
  }, [productId, isLoading, product]);

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="border-b">
        <div className="container mx-auto px-4">
          <ContactHero />
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ContactInfoCards />
        </div>
      </section>

      {/* Contact Form + Sidebar */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-12 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0">
              {productId && isLoading && (
                <div className="mb-8 rounded-2xl border bg-card p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-6 w-40 rounded bg-muted" />
                    <div className="h-24 rounded bg-muted" />
                  </div>
                </div>
              )}

              {productId && isError && (
                <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                  <h3 className="font-semibold text-red-700">
                    Product not found
                  </h3>

                  <p className="mt-2 text-sm text-red-600">
                    This inquiry will be sent as a general contact message.
                  </p>
                </div>
              )}

              {!isLoading && !isError && product && (
                <ProductInquiryCard product={product} />
              )}

              <div ref={inquirySectionRef} id="product-inquiry" className="scroll-mt-28">
                <ContactForm
                  productId={product ? product.id : undefined}
                />
              </div>
            </div>

            <div className="h-fit xl:sticky xl:top-28">
              <ContactSidebar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}