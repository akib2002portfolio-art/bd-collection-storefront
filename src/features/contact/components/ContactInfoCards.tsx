import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";

import { useSiteSettings } from "../../settings/hooks";
import { ContactInfoCard } from "./ContactInfoCard";

export function ContactInfoCards() {
  const { data } = useSiteSettings();

  const cards = [
    {
      icon: <Phone size={20} />,
      title: "Phone",
      subtitle: "Call us anytime",
      value: data?.phone || "+880 1XXX-XXXXXX",
      href: data?.phone ? `tel:${data.phone}` : undefined,
      breakMode: "normal" as const,
    },
    {
      icon: <Mail size={20} />,
      title: "Email",
      subtitle: "We usually reply within 24 hours",
      value: data?.email || "hello@bdcollection.com",
      href: data?.email ? `mailto:${data.email}` : undefined,
      breakMode: "email" as const,
    },
    {
      icon: <MapPin size={20} />,
      title: "Address",
      subtitle: "Visit our office",
      value:
        data?.address ||
        "House #13, Road #39\nSector #03\nUttara Model Town\nDhaka-1230",
      href: undefined,
      breakMode: "normal" as const,
    },
    {
      icon: <MessageCircle size={20} />,
      title: "WhatsApp",
      subtitle: "Start a conversation",
      value: data?.whatsapp || "+880 1XXX-XXXXXX",
      href: data?.whatsapp
        ? `https://wa.me/${data.whatsapp.replace(/\D/g, "")}`
        : undefined,
      breakMode: "normal" as const,
    },
  ];

  return (
    <section className="mx-auto max-w-6xl">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <ContactInfoCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            subtitle={card.subtitle}
            value={card.value}
            href={card.href}
            breakMode={card.breakMode}
          />
        ))}
      </div>
    </section>
  );
}