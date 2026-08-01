import {
  Search,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";

import {
  NotificationBell,
  NotificationDropdown,
} from "../../inquiries/components";

import type { Inquiry } from "../../../contact/types";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;

  unreadCount?: number;

  notifications?: Inquiry[];

  onNotificationClick?: (
    inquiry: Inquiry,
  ) => void;
}

export function AdminHeader({
  title,
  subtitle,
  unreadCount = 0,
  notifications = [],
  onNotificationClick,
}: AdminHeaderProps) {
  const [
    notificationOpen,
    setNotificationOpen,
  ] = useState(false);

  return (
    <header className="flex flex-col gap-6 border-b border-hairline bg-canvas px-8 py-6 shadow-sm md:flex-row md:items-center md:justify-between">

      {/* Left */}
      <div>

        <h1 className="font-display text-3xl text-ink md:text-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="eyebrow mt-2 !text-taupe">
            {subtitle}
          </p>
        )}

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative hidden md:block">

          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />

          <input
            type="text"
            placeholder="Search products, orders..."
            className="w-72 rounded-full border border-hairline bg-canvas py-2.5 pl-11 pr-5 text-sm text-ink outline-none transition-colors placeholder:text-taupe focus:border-ink focus:bg-white"
          />

        </div>

        {/* Notifications */}
        <div className="relative">

          <NotificationBell
            unreadCount={unreadCount}
            onClick={() =>
              setNotificationOpen(
                (prev) => !prev,
              )
            }
          />

          <NotificationDropdown
            open={notificationOpen}
            inquiries={notifications}
            onSelect={(inquiry: Inquiry) => {
              setNotificationOpen(false);

              onNotificationClick?.(
                inquiry,
              );
            }}
          />

        </div>

        {/* Profile */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-full border border-hairline px-3 py-2 transition-colors hover:border-ink"
        >

          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-medium text-canvas">
            A
          </span>

          <span className="hidden text-left md:block">

            <span className="block text-sm text-ink">
              Administrator
            </span>

            <span className="eyebrow !text-taupe">
              Owner
            </span>

          </span>

          <ChevronDown className="h-4 w-4 text-taupe" />

        </button>

      </div>

    </header>
  );
}