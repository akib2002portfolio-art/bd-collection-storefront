interface PlaceholderImageProps {
  label: string;
  aspect?: string;
}

export function PlaceholderImage({
  label,
  aspect = "4/5",
}: PlaceholderImageProps) {
  return (
    <div
      className="flex w-full select-none items-center justify-center bg-muted text-muted-foreground"
      style={{
        aspectRatio: aspect,
      }}
    >
      <span className="px-4 text-center text-sm">
        {label}
      </span>
    </div>
  );
}