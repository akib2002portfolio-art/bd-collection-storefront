import { Menu, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

import { NotificationBell, NotificationDropdown } from "../../inquiries/components";
import { AdminSearch } from "../components/AdminSearch";

import type { Inquiry } from "../../../contact/types";
import { useNavigate } from "@tanstack/react-router";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  unreadCount?: number;
  notifications?: Inquiry[];
  onMenuClick?: () => void;
}

export function AdminHeader({
  title,
  subtitle,
  unreadCount = 0,
  notifications = [],
  onMenuClick,
}: AdminHeaderProps) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-hairline bg-canvas px-4 py-5 shadow-sm md:flex-row md:items-center md:justify-between md:px-8 md:py-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-full border border-hairline p-2 text-ink transition-colors hover:bg-bone lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="font-display text-2xl text-ink md:text-4xl">{title}</h1>
          {subtitle && <p className="eyebrow mt-1 md:mt-2">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div className="hidden sm:block">
          <AdminSearch />
        </div>

        <div className="relative">
          <div
            onMouseEnter={() => {
              if (closeTimeout.current) {
                clearTimeout(closeTimeout.current);
              }
            }}
            onMouseLeave={() => {
              closeTimeout.current = setTimeout(
                () => setNotificationOpen(false),
                200,
              );
            }}
          >
            <NotificationBell
              unreadCount={unreadCount}
              onClick={() => setNotificationOpen((prev) => !prev)}
            />
          </div>

          <div
            onMouseEnter={() => {
              if (closeTimeout.current) {
                clearTimeout(closeTimeout.current);
              }
            }}
            onMouseLeave={() => {
              closeTimeout.current = setTimeout(
                () => setNotificationOpen(false),
                200,
              );
            }}
          >
            <NotificationDropdown
              open={notificationOpen}
              inquiries={notifications}
              onSelect={() => {
                setNotificationOpen(false);
                navigate({ to: "/admin/inquiries" });
              }}
            />
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-3 rounded-full border border-hairline px-3 py-2 transition-colors hover:border-ink"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-medium text-canvas">
            A
          </span>

          <span className="hidden text-left md:block">
            <span className="block text-sm text-ink">Administrator</span>
            <span className="eyebrow">Owner</span>
          </span>

          <ChevronDown className="hidden h-4 w-4 text-taupe md:block" />
        </button>
      </div>
    </header>
  );
}