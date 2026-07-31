import { ContactHero } from "../components/ContactHero";
import { ContactInfoCards } from "../components/ContactInfoCards";
import { ContactForm } from "../components/ContactForm";
import { ContactSidebar } from "../components/ContactSidebar";

export function ContactPage() {
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

            {/* Contact Form */}

            <div className="min-w-0">
              <ContactForm />
            </div>

            {/* Sidebar */}

            <div className="xl:sticky xl:top-28 h-fit">
              <ContactSidebar />
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}