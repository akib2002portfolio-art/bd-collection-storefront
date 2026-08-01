import {
  Search,
  Filter,
} from "lucide-react";

interface InquiryToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  filter:
    | "all"
    | "unread"
    | "read"
    | "archived";

  onFilterChange: (
    value:
      | "all"
      | "unread"
      | "read"
      | "archived",
  ) => void;
}

const filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Unread",
    value: "unread",
  },
  {
    label: "Read",
    value: "read",
  },
  {
    label: "Archived",
    value: "archived",
  },
] as const;

export function InquiryToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: InquiryToolbarProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="relative w-full lg:max-w-sm">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            value={search}
            onChange={(e) =>
              onSearchChange(
                e.target.value,
              )
            }
            placeholder="Search customer..."
            className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 outline-none transition focus:ring-2 focus:ring-primary"
          />

        </div>

        <div className="flex flex-wrap items-center gap-2">

          <Filter className="h-4 w-4 text-muted-foreground" />

          {filters.map((item) => (
            <button
              key={item.value}
              onClick={() =>
                onFilterChange(
                  item.value,
                )
              }
              className={`rounded-lg border px-3 py-2 text-sm transition ${
                filter === item.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {item.label}
            </button>
          ))}

        </div>

      </div>
    </div>
  );
}