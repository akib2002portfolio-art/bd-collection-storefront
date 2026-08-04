import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

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

    const seoMetadata: SeoMetadata = {
      title: metadata.title || defaultTitle,
      description: metadata.description || defaultDescription,
      canonical: metadata.canonical || BASE_URL,
      themeColor: metadata.themeColor || "#000000",
      applicationName: settings?.storeName || "BD Collection",
      author: metadata.author || "BD Collection",
      language: metadata.language || "en",
      openGraph: {
        title: metadata.openGraph?.title || metadata.title || defaultTitle,
        description: metadata.openGraph?.description || metadata.description || defaultDescription,
        url: metadata.openGraph?.url || metadata.canonical || BASE_URL,
        type: metadata.openGraph?.type || "website",
        siteName: settings?.storeName || "BD Collection",
        images:
          metadata.openGraph?.images ||
          [{ url: defaultImage, alt: settings?.storeName || "BD Collection" }],
      },
      twitter: {
        card: metadata.twitter?.card || "summary_large_image",
        title: metadata.twitter?.title || metadata.title || defaultTitle,
        description: metadata.twitter?.description || metadata.description || defaultDescription,
        image: metadata.twitter?.image || defaultImage,
        ...(metadata.twitter?.site ? { site: metadata.twitter.site } : {}),
        ...(metadata.twitter?.creator ? { creator: metadata.twitter.creator } : {}),
      },
      keywords: metadata.keywords,
      robots: metadata.robots,
    };

    const builtMetadata = buildMetadata(seoMetadata, BASE_URL, defaultTitle);

    document.title = builtMetadata.title;

    const desiredMetaAttributes = new Set(
      builtMetadata.tags
        .map((tag) => tag.name ?? tag.property)
        .filter((value): value is string => Boolean(value)),
    );

    Array.from(document.head.querySelectorAll("meta[name], meta[property]")).forEach((element) => {
      const attrName = element.hasAttribute("name") ? "name" : "property";
      const attrValue = element.getAttribute(attrName);
      if (!attrValue) return;

      const isManagedMetaTag = ["description", "keywords", "robots", "author", "theme-color", "application-name", "language", "og:title", "og:description", "og:url", "og:type", "og:site_name", "og:locale", "og:image", "og:image:alt", "og:image:type", "og:image:width", "og:image:height", "twitter:card", "twitter:site", "twitter:creator", "twitter:title", "twitter:description", "twitter:image"].includes(attrValue);
      if (!isManagedMetaTag || desiredMetaAttributes.has(attrValue)) {
        return;
      }

      element.remove();
    });

    builtMetadata.tags.forEach((tag) => {
      const attrName = tag.name ? "name" : "property";
      const attrValue = tag.name ?? tag.property;
      if (!attrValue) return;

      const selector = `meta[${attrName}="${CSS.escape(attrValue)}"]`;
      const existingElements = Array.from(document.head.querySelectorAll(selector)) as HTMLMetaElement[];

      if (existingElements.length > 0) {
        existingElements.forEach((element) => {
          element.content = tag.content;
        });
      } else {
        const element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        element.content = tag.content;
        document.head.appendChild(element);
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
    jsonLdScript.textContent = buildJsonLd(seoMetadata, BASE_URL, settings);
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
