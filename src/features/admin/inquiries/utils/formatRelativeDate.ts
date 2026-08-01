export function formatRelativeDate(
  date: string,
): string {

  const now = new Date();

  const target = new Date(date);

  const diff =
    now.getTime() - target.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute)
    return "Just now";

  if (diff < hour)
    return `${Math.floor(diff / minute)} min ago`;

  if (diff < day)
    return `${Math.floor(diff / hour)} hour${Math.floor(diff / hour) > 1 ? "s" : ""} ago`;

  if (diff < day * 2)
    return "Yesterday";

  if (diff < day * 7)
    return `${Math.floor(diff / day)} days ago`;

  return target.toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year:
        target.getFullYear() !==
        now.getFullYear()
          ? "numeric"
          : undefined,
    },
  );

}