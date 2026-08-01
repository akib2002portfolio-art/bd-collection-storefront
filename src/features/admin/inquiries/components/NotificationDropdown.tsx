import type { Inquiry } from "../../../contact/types";

import { NotificationItem } from "./NotificationItem";

interface NotificationDropdownProps {
  open: boolean;

  inquiries: Inquiry[];

  onSelect: (
    inquiry: Inquiry,
  ) => void;
}

export function NotificationDropdown({
  open,
  inquiries,
  onSelect,
}: NotificationDropdownProps) {
  if (!open) return null;

  return (
    <div className="absolute right-0 top-12 z-50 w-96 overflow-hidden rounded-xl border bg-card shadow-xl">

      <div className="border-b p-4">

        <h3 className="font-semibold">
          Notifications
        </h3>

      </div>

      {inquiries.length === 0 ? (
        <div className="p-8 text-center text-sm text-muted-foreground">
          You're all caught up 🎉
        </div>
      ) : (
        inquiries.map((item) => (
          <NotificationItem
            key={item.id}
            inquiry={item}
            onClick={() =>
              onSelect(item)
            }
          />
        ))
      )}

    </div>
  );
}