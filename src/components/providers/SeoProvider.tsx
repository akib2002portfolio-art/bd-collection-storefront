import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { useRouterState } from "@tanstack/react-router";

import { useSiteSettings } from "../../features/settings/hooks";
import { buildMetadata, buildJsonLd, type SeoMetadata } from "../../lib/seo";

const BASE_URL = import.meta.env.VITE_PUBLIC_SITE_URL || "https://www.bd-collection.com";

interface SeoContextValue {
  setMetadata: (metadata: SeoMetadata) => void;
  resetMetadata: () => void;
}

const SeoContext = createContext<SeoContextValue | null>(null);

export function SeoProvider({ children }: PropsWithChildren) {
  const { data: settings } = useSiteSettings();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [metadata, setMetadata] = useState<SeoMetadata>({});

  const value = useMemo(
    () => ({
      setMetadata,
      resetMetadata: () => setMetadata({}),
    }),
    [],
  );

  useEffect(() => {
    const defaultTitle = settings?.seoTitle || settings?.storeName || "BD Collection";
    const defaultDescription = settings?.seoDescription || settings?.description || "Premium fashion for modern wardrobes.";
    const defaultImage = settings?.seoImage || `${BASE_URL}/og-image.svg`;

    const resolveUrl = (value: string) =>
      new URL(value, BASE_URL).href;

    const canonical = metadata.canonical
      ? resolveUrl(metadata.canonical)
      : resolveUrl(pathname || "/");

    const openGraphUrl = metadata.openGraph?.url
      ? resolveUrl(metadata.openGraph.url)
      : canonical;

    const seoMetadata: SeoMetadata = {
      title: metadata.title || defaultTitle,
      description: metadata.description || defaultDescription,
      canonical,
      themeColor: metadata.themeColor || "#000000",
      applicationName: settings?.storeName || "BD Collection",
      author: metadata.author || "BD Collection",
      language: metadata.language || "en",
      openGraph: {
        title: metadata.openGraph?.title || metadata.title || defaultTitle,
        description: metadata.openGraph?.description || metadata.description || defaultDescription,
        url: openGraphUrl,
        type: metadata.openGraph?.type || "website",
        siteName: settings?.storeName || "BD Collection",
        images:
          metadata.openGraph?.images ||
          [{ url: defaultImage, alt: settings?.storeName || "BD Collection" }],
      },
      twitter: {
        card: metadata.twitter?.card || "summary_large_image",
        site: metadata.twitter?.site || "@bdcollection",
        creator: metadata.twitter?.creator || "@bdcollection",
        title: metadata.twitter?.title || metadata.title || defaultTitle,
        description: metadata.twitter?.description || metadata.description || defaultDescription,
        image: metadata.twitter?.image || defaultImage,
      },
      keywords: metadata.keywords,
      robots: metadata.robots,
    };

    const builtMetadata = buildMetadata(seoMetadata, BASE_URL, defaultTitle);

    document.title = builtMetadata.title;

    builtMetadata.tags.forEach((tag) => {
      const attrName = tag.name ? "name" : "property";
      const attrValue = tag.name ?? tag.property;
      if (!attrValue) return;

      const selector = `meta[${attrName}="${CSS.escape(attrValue)}"]`;
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        element.content = tag.content;
        document.head.appendChild(element);
      } else {
        element.content = tag.content;
      }
    });

    const canonicalLink = document.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonicalLink) {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = seoMetadata.canonical || BASE_URL;
      document.head.appendChild(link);
    } else {
      canonicalLink.href = seoMetadata.canonical || BASE_URL;
    }

    const themeColorMeta = document.head.querySelector("meta[name='theme-color']") as HTMLMetaElement | null;
    if (!themeColorMeta) {
      const link = document.createElement("meta");
      link.name = "theme-color";
      link.content = seoMetadata.themeColor || "#000000";
      document.head.appendChild(link);
    } else {
      themeColorMeta.content = seoMetadata.themeColor || "#000000";
    }

    const jsonLdId = "structured-data-jsonld";
    let jsonLdScript = document.head.querySelector(`script[id='${jsonLdId}']`) as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.id = jsonLdId;
      jsonLdScript.type = "application/ld+json";
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = buildJsonLd(seoMetadata, BASE_URL);
  }, [metadata, settings]);

  return <SeoContext.Provider value={value}>{children}</SeoContext.Provider>;
}

export function useSeoContext() {
  const context = useContext(SeoContext);
  if (!context) {
    throw new Error("useSeoContext must be used within SeoProvider");
  }
  return context;
}
