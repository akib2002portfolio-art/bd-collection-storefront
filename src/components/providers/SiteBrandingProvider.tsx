import { useEffect } from "react";

import { useSiteSettings } from "../../features/settings/hooks";

export function SiteBrandingProvider() {
  const { data: settings } = useSiteSettings();

  useEffect(() => {
    if (!settings) return;

    // Browser title
    document.title =
      settings.browserTitle?.trim() ||
      settings.storeName ||
      "BD Collection";

    // Favicon
    if (settings.faviconUrl?.trim()) {
      let link = document.querySelector(
        'link[rel="icon"]',
      ) as HTMLLinkElement | null;

      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }

      // Force browser refresh when favicon changes
      link.href =
        settings.faviconUrl +
        "?v=" +
        encodeURIComponent(settings.updatedAt);
    }
  }, [settings]);

  return null;
}