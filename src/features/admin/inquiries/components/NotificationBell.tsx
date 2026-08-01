import { Bell } from "lucide-react";

interface NotificationBellProps {
  unreadCount: number;
  onClick: () => void;
}

export function NotificationBell({
  unreadCount,
  onClick,
}: NotificationBellProps) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-xl border bg-card p-2 transition hover:bg-muted"
    >
      <Bell className="h-5 w-5" />

      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-semibold text-white">
          {unreadCount > 99
            ? "99+"
            : unreadCount}
        </span>
      )}
    </button>
  );
}