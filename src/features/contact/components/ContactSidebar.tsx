import {
  Clock3,
  Headphones,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { useSiteSettings } from "../../settings/hooks";
import { ContactSidebarCard } from "./ContactSidebarCard";

export function ContactSidebar() {
  const { data } = useSiteSettings();

  return (
    <aside className="space-y-6">
      {/* Business Hours */}

      <ContactSidebarCard
        icon={
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Clock3 size={22} />
          </div>
        }
        title="Business Hours"
        subtitle="We're available to assist you"
      >
        <div className="space-y-3">
          <div>
            <p className="font-medium">Monday – Sunday</p>
            <p className="text-sm text-muted-foreground">
              {data?.businessHours ?? "Open 24 Hours"}
            </p>
          </div>

          <div className="rounded-xl bg-primary/5 p-3">
            <p className="text-sm text-muted-foreground">
              Customer support is available throughout the week for product
              inquiries and order assistance.
            </p>
          </div>
        </div>
      </ContactSidebarCard>

      {/* Response Time */}

      <ContactSidebarCard
        icon={
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <ShieldCheck size={22} />
          </div>
        }
        title="Response Time"
        subtitle="Fast & Reliable Support"
      >
        <div className="space-y-4">
          <div>
            <p className="text-3xl font-bold">24 hrs</p>
            <p className="text-sm text-muted-foreground">
              Average response time
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-3">
            <p className="text-sm text-muted-foreground">
              Product inquiries are prioritized to help you make purchase
              decisions quickly.
            </p>
          </div>
        </div>
      </ContactSidebarCard>

      {/* We Can Help With */}

      <ContactSidebarCard
        icon={
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Headphones size={22} />
          </div>
        }
        title="We Can Help With"
        subtitle="Our support team can assist with"
      >
        <div className="space-y-3">
          {[
            "Product Inquiry",
            "Bulk Orders",
            "Delivery Information",
            "Customer Support",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/60"
            >
              <CheckCircle2
                size={18}
                className="text-primary"
              />

              <span className="text-sm font-medium">
                {item}
              </span>
            </div>
          ))}
        </div>
      </ContactSidebarCard>
    </aside>
  );
}