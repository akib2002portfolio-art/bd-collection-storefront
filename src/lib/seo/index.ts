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
  breadcrumbs?: Array<{
    name: string;
    url?: string;
  }>;
  product?: {
    name?: string;
    description?: string;
    image?: string;
    sku?: string;
    category?: string;
    price?: number | string | null;
    currency?: string | null;
    availability?: string | null;
    url?: string;
  };
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

interface JsonLdSiteSettings {
  storeName?: string | null;
  description?: string | null;
  logoUrl?: string | null;
  faviconUrl?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  businessHours?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  whatsapp?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  seoImage?: string | null;
  defaultCurrency?: string | null;
  contactEmail?: string | null;
}

export interface BuiltMetadata {
  title: string;
  tags: HeadMetaTag[];
}

export function normalizeUrl(url: string | undefined, baseUrl: string): string | undefined {
  if (!url) {
    return undefined;
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(url, normalizedBaseUrl).toString();
}

export function buildMetadata(
  metadata: SeoMetadata,
  baseUrl: string,
  defaultTitle: string,
): BuiltMetadata {
  const title = metadata.title || defaultTitle;
  const description = metadata.description || "Premium fashion for modern wardrobes.";
  const canonical = normalizeUrl(metadata.canonical || baseUrl, baseUrl) || baseUrl;
  const themeColor = metadata.themeColor || "#000000";
  const applicationName = metadata.applicationName || defaultTitle;
  const robots = metadata.robots || "index, follow";
  const author = metadata.author || "BD Collection";

  const tags: HeadMetaTag[] = [
    { name: "description", content: description },
    { name: "robots", content: robots },
    { name: "author", content: author },
    { name: "theme-color", content: themeColor },
    { name: "application-name", content: applicationName },
    { property: "og:title", content: metadata.openGraph?.title || title },
    { property: "og:description", content: metadata.openGraph?.description || description },
    { property: "og:url", content: normalizeUrl(metadata.openGraph?.url || canonical, baseUrl) || canonical },
    { property: "og:type", content: metadata.openGraph?.type || "website" },
    { property: "og:site_name", content: metadata.openGraph?.siteName || applicationName },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: metadata.twitter?.card || "summary_large_image" },
    { name: "twitter:title", content: metadata.twitter?.title || title },
    { name: "twitter:description", content: metadata.twitter?.description || description },
  ];

  if (metadata.keywords?.trim()) {
    tags.splice(1, 0, { name: "keywords", content: metadata.keywords });
  }

  if (metadata.twitter?.site?.trim()) {
    tags.push({ name: "twitter:site", content: metadata.twitter.site });
  }

  if (metadata.twitter?.creator?.trim()) {
    tags.push({ name: "twitter:creator", content: metadata.twitter.creator });
  }

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
  settings?: JsonLdSiteSettings,
): string {
  const siteName = metadata.openGraph?.siteName || metadata.applicationName || settings?.storeName || "BD Collection";
  const description = metadata.description || settings?.description || "Premium fashion for modern wardrobes.";
  const canonicalUrl = normalizeUrl(metadata.canonical || metadata.openGraph?.url || baseUrl, baseUrl) || baseUrl;
  const title = metadata.title || settings?.storeName || siteName;
  const image = metadata.openGraph?.images?.[0]?.url || metadata.product?.image || metadata.twitter?.image || settings?.seoImage || `${baseUrl}/og-image.svg`;
  const siteUrl = normalizeUrl(baseUrl, baseUrl) || baseUrl;
  const logoUrl = normalizeUrl(settings?.logoUrl || settings?.faviconUrl || "/favicon.svg", baseUrl) || `${baseUrl}/favicon.svg`;
  const contactEmail = settings?.email || settings?.contactEmail || undefined;
  const telephone = settings?.phone || undefined;
  const address = settings?.address ? { "@type": "PostalAddress", "streetAddress": settings.address } : undefined;
  const openingHours = settings?.businessHours ? settings.businessHours : undefined;

  const sameAs = [settings?.facebook, settings?.instagram, settings?.whatsapp, settings?.linkedin, settings?.youtube]
    .filter((value): value is string => Boolean(value && value.trim()));

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    "name": siteName,
    "url": siteUrl,
    "logo": logoUrl,
    ...(description ? { description } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...((contactEmail || telephone) ? {
      contactPoint: [
        ...(contactEmail ? [{ "@type": "ContactPoint", "email": contactEmail, "contactType": "customer service" }] : []),
        ...(telephone ? [{ "@type": "ContactPoint", "telephone": telephone, "contactType": "customer service" }] : []),
      ],
    } : {}),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    "url": siteUrl,
    "name": siteName,
    "description": description,
    "publisher": {
      "@id": `${siteUrl}#organization`,
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/shop/all?product={product}`,
      "query-input": "required name=product",
    },
  };

  const breadcrumbItems = metadata.breadcrumbs?.length
    ? metadata.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url ? normalizeUrl(item.url, siteUrl) || item.url : undefined,
      })).filter((item) => item.item || item.name)
    : buildBreadcrumbs(canonicalUrl, title);

  const breadcrumbList = breadcrumbItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumbs`,
    "itemListElement": breadcrumbItems,
  } : undefined;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    "url": canonicalUrl,
    "name": title,
    "description": description,
    "isPartOf": {
      "@id": `${siteUrl}#website`,
    },
    ...(image ? { image } : {}),
    ...(breadcrumbList ? { breadcrumb: { "@id": `${canonicalUrl}#breadcrumbs` } } : {}),
  };

  const graph: Array<Record<string, unknown>> = [organization, website, webPage];

  if (canonicalUrl === siteUrl || canonicalUrl === `${siteUrl}/`) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "Store",
      "@id": `${siteUrl}#store`,
      "name": siteName,
      "url": siteUrl,
      "logo": logoUrl,
      ...(image ? { image } : {}),
      ...(telephone ? { telephone } : {}),
      ...(contactEmail ? { email: contactEmail } : {}),
      ...(address ? { address } : {}),
      ...(openingHours ? { openingHours: openingHours } : {}),
    });
  }

  if (canonicalUrl.includes("/about") || canonicalUrl.includes("/about/")) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${canonicalUrl}#aboutpage`,
      "name": title,
      "url": canonicalUrl,
      "description": description,
    });
  }

  if (canonicalUrl.includes("/contact") || canonicalUrl.includes("/contact/")) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${canonicalUrl}#contactpage`,
      "name": title,
      "url": canonicalUrl,
      "description": description,
    });
  }

  if (canonicalUrl.includes("/shop/") && !canonicalUrl.includes("/shop/all")) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${canonicalUrl}#collectionpage`,
      "name": title,
      "url": canonicalUrl,
      "description": description,
    });
  }

  if (canonicalUrl.includes("/product/") || canonicalUrl.includes("/product")) {
    const productName = metadata.product?.name || title.replace(/\s*\|.*$/, "").trim() || siteName;
    const productDescription = metadata.product?.description || metadata.description || description;
    const productImage = metadata.product?.image || image;
    const productSku = metadata.product?.sku || undefined;
    const productCategory = metadata.product?.category || undefined;
    const productPrice = metadata.product?.price ?? undefined;
    const currency = metadata.product?.currency || settings?.defaultCurrency || undefined;
    const availabilityValue = metadata.product?.availability || (typeof productPrice === "number" || typeof productPrice === "string" ? "https://schema.org/InStock" : undefined);
    const priceValid = typeof productPrice === "number" || (typeof productPrice === "string" && productPrice.trim().length > 0);

    const productSchema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${canonicalUrl}#product`,
      "name": productName,
      "description": productDescription,
      ...(productImage ? { image: productImage } : {}),
      ...(productSku ? { sku: productSku } : {}),
      ...(productCategory ? { category: productCategory } : {}),
    };

    if (priceValid || currency || availabilityValue) {
      productSchema.offers = {
        "@type": "Offer",
        "url": metadata.product?.url || canonicalUrl,
        ...(priceValid ? { price: productPrice } : {}),
        ...(currency ? { priceCurrency: currency } : {}),
        ...(availabilityValue ? { availability: availabilityValue } : {}),
      };
    }

    graph.push(productSchema);
  }

  if (breadcrumbList) {
    graph.push(breadcrumbList);
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function buildBreadcrumbs(canonicalUrl: string, title: string) {
  const normalizedUrl = canonicalUrl.endsWith("/") ? canonicalUrl : `${canonicalUrl}/`;
  const pathSegments = normalizedUrl
    .replace(/https?:\/\/[^/]+/i, "")
    .split("/")
    .filter(Boolean);

  const breadcrumbItems = [{ name: "Home", url: "/" }];

  if (pathSegments.length === 0) {
    return breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    }));
  }

  if (pathSegments[0] === "about") {
    breadcrumbItems.push({ name: "About", url: "/about" });
  } else if (pathSegments[0] === "contact") {
    breadcrumbItems.push({ name: "Contact", url: "/contact" });
  } else if (pathSegments[0] === "shop") {
    breadcrumbItems.push({ name: "Shop", url: "/shop" });
    if (pathSegments.length > 1 && pathSegments[1] !== "all") {
      breadcrumbItems.push({ name: title.replace(/\s*\|.*$/, "").trim() || pathSegments[1], url: `/${pathSegments.join("/")}` });
    }
  } else if (pathSegments[0] === "product") {
    breadcrumbItems.push({ name: "Shop", url: "/shop" });
    breadcrumbItems.push({ name: title.replace(/\s*\|.*$/, "").trim() || "Product", url: `/${pathSegments.join("/")}` });
  }

  return breadcrumbItems.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url,
  }));
}
