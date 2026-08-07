import { Link } from "@tanstack/react-router";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

import { useSiteSettings } from "../../../features/settings/hooks";

export function Footer() {
  const { data: settings } = useSiteSettings();

  return (
    <footer className="border-t border-white/10 bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold tracking-tight">
              {settings?.storeName}
            </h2>

            {settings?.tagline && (
              <p className="mt-4 leading-7 text-white/70">
                {settings.tagline}
              </p>
            )}

            {settings?.footerText && (
              <p className="mt-6 text-sm leading-7 text-white/55">
                {settings.footerText}
              </p>
            )}

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3 text-white/70">

              <li>
                <Link
                  to="/"
                  className="transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="transition hover:text-white"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="transition hover:text-white"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="transition hover:text-white"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-white/70">

              {settings?.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0" />
                  <span>{settings.address}</span>
                </div>
              )}

              {settings?.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4" />
                  <span>{settings.phone}</span>
                </div>
              )}

              {settings?.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  <span>{settings.email}</span>
                </div>
              )}

              {settings?.businessHours && (
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-4 w-4 shrink-0" />
                  <span>{settings.businessHours}</span>
                </div>
              )}

            </div>

          </div>

          {/* Follow */}

          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Follow Us
            </h3>

            <div className="flex flex-wrap gap-3">

              {settings?.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${settings?.storeName ?? "BD Collection"} on Facebook`}
                  className="rounded-full border border-white/15 p-3 transition hover:bg-white hover:text-black"
                >
                  <FaFacebookF className="h-5 w-5" />
                </a>
              )}

              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${settings?.storeName ?? "BD Collection"} on Instagram`}
                  className="rounded-full border border-white/15 p-3 transition hover:bg-white hover:text-black"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
              )}

              {settings?.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${settings?.storeName ?? "BD Collection"} on LinkedIn`}
                  className="rounded-full border border-white/15 p-3 transition hover:bg-white hover:text-black"
                >
                  <FaLinkedinIn className="h-5 w-5" />
                </a>
              )}

              {settings?.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${settings?.storeName ?? "BD Collection"} on YouTube`}
                  className="rounded-full border border-white/15 p-3 transition hover:bg-white hover:text-black"
                >
                  <FaYoutube className="h-5 w-5" />
                </a>
              )}

              {settings?.whatsapp && (
                <a
                  href={settings.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Chat with ${settings?.storeName ?? "BD Collection"} on WhatsApp`}
                  className="rounded-full border border-white/15 p-3 transition hover:bg-white hover:text-black"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}

            </div>

          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/50 md:flex-row">

            <p>
              {settings?.copyrightText ??
                `© ${new Date().getFullYear()} ${settings?.storeName}. All rights reserved.`}
            </p>

            <div className="text-right">
              <p className="text-sm text-white/50">
                Website Designed & Developed by
              </p>

              <a
                href="https://akibalimran.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-lg font-semibold text-white transition hover:text-primary"
              >
                Akib Al Imran
              </a>

              <p className="mt-1 text-xs text-white/45">
                Full-Stack Software Engineer
                <br />
                React • TypeScript • AI • UI/UX
              </p>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}