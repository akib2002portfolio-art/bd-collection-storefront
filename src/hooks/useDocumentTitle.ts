import { useLayoutEffect } from "react";

import { useSiteSettings } from "../features/settings/hooks";

export function useDocumentTitle(pageTitle?: string) {
  const { data: settings } = useSiteSettings();

  useLayoutEffect(() => {
    const storeName = settings?.storeName || "BD Collection";
    document.title = pageTitle
      ? `${pageTitle} · ${storeName}`
      : storeName;
  }, [pageTitle, settings]);
}
