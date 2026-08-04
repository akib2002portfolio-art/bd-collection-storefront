export interface SeoMetadata {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  author?: string;
  themeColor?: string;
  applicationName?: string;
  language?: string;
  openGraph?: OpenGraphMetadata;
  twitter?: TwitterMetadata;
}

export interface OpenGraphMetadata {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
  siteName?: string;
  images?: OpenGraphImage[];
}

export interface OpenGraphImage {
  url: string;
  alt?: string;
  type?: string;
  width?: number;
  height?: number;
}

export interface TwitterMetadata {
  card?: string;
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  image?: string;
}

export interface HeadMetaTag {
  name?: string;
  property?: string;
  content: string;
}

export interface BuiltMetadata {
  title: string;
  tags: HeadMetaTag[];
}

export function buildMetadata(
  metadata: SeoMetadata,
  baseUrl: string,
  defaultTitle: string,
): BuiltMetadata {
  const title = metadata.title || defaultTitle;
  const description = metadata.description || "Premium fashion for modern wardrobes.";
  const canonical = metadata.canonical || baseUrl;
  const themeColor = metadata.themeColor || "#000000";
  const applicationName = metadata.applicationName || defaultTitle;
  const language = metadata.language || "en";
  const robots = metadata.robots || "index, follow";
  const author = metadata.author || "BD Collection";

  const tags: HeadMetaTag[] = [
    { name: "description", content: description },
    { name: "keywords", content: metadata.keywords || "fashion, ecommerce, clothing, premium apparel" },
    { name: "robots", content: robots },
    { name: "author", content: author },
    { name: "theme-color", content: themeColor },
    { name: "application-name", content: applicationName },
    { name: "language", content: language },
    { property: "og:title", content: metadata.openGraph?.title || title },
    { property: "og:description", content: metadata.openGraph?.description || description },
    { property: "og:url", content: metadata.openGraph?.url || canonical },
    { property: "og:type", content: metadata.openGraph?.type || "website" },
    { property: "og:site_name", content: metadata.openGraph?.siteName || applicationName },
    { name: "twitter:card", content: metadata.twitter?.card || "summary_large_image" },
    { name: "twitter:site", content: metadata.twitter?.site || "@bdcollection" },
    { name: "twitter:creator", content: metadata.twitter?.creator || "@bdcollection" },
    { name: "twitter:title", content: metadata.twitter?.title || title },
    { name: "twitter:description", content: metadata.twitter?.description || description },
  ];

  const imageUrl = metadata.openGraph?.images?.[0]?.url || metadata.twitter?.image || `${baseUrl}/og-image.svg`;

  if (metadata.openGraph?.images?.length) {
    metadata.openGraph.images.forEach((image) => {
      tags.push({ property: "og:image", content: image.url });
      if (image.alt) {
        tags.push({ property: "og:image:alt", content: image.alt });
      }
      if (image.type) {
        tags.push({ property: "og:image:type", content: image.type });
      }
      if (image.width) {
        tags.push({ property: "og:image:width", content: String(image.width) });
      }
      if (image.height) {
        tags.push({ property: "og:image:height", content: String(image.height) });
      }
    });
  } else {
    tags.push({ property: "og:image", content: imageUrl });
  }

  if (metadata.twitter?.image) {
    tags.push({ name: "twitter:image", content: metadata.twitter.image });
  } else {
    tags.push({ name: "twitter:image", content: imageUrl });
  }

  return {
    title,
    tags,
  };
}

export function buildJsonLd(
  metadata: SeoMetadata,
  baseUrl: string,
): string {
  const siteName = metadata.openGraph?.siteName || metadata.applicationName || "BD Collection";
  const url = metadata.openGraph?.url || metadata.canonical || baseUrl;
  const title = metadata.title || siteName;
  const description = metadata.description || "Premium fashion for modern wardrobes.";
  const image = metadata.openGraph?.images?.[0]?.url || metadata.twitter?.image || `${baseUrl}/og-image.svg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": siteName,
        "url": baseUrl,
        "logo": `${baseUrl}/favicon.svg`,
      },
      {
        "@type": "WebSite",
        "url": baseUrl,
        "name": title,
        "description": description,
        "publisher": {
          "@type": "Organization",
          "name": siteName,
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/shop/all?product={product}`,
          "query-input": "required name=product",
        },
      },
      {
        "@type": "WebPage",
        "url": url,
        "name": title,
        "description": description,
        "image": image,
      },
    ],
  };

  return JSON.stringify(jsonLd);
}
