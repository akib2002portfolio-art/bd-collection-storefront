import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseUrl = process.env.VITE_PUBLIC_SITE_URL || "https://www.bd-collection.com";
const outputPath = path.join(__dirname, "..", "public", "sitemap.xml");

const staticRoutes = [
  "/",
  "/shop",
  "/shop/all",
  "/about",
  "/contact",
];

function formatUrl(url) {
  return `  <url>\n    <loc>${baseUrl}${url}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>`;
}

async function main() {
  const urls = [...new Set(staticRoutes)];

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
      const categories = await supabase
        .from("categories")
        .select("slug")
        .eq("active", true);

      if (categories.error) {
        console.warn("Sitemap category query warning:", categories.error.message);
      } else {
        const rows = categories.data ?? [];
        rows.forEach((category) => {
          if (category.slug) {
            urls.push(`/shop/${category.slug}`);
          }
        });
      }
    } catch (error) {
      console.warn("Sitemap failed to fetch categories:", error.message);
    }

    try {
      const products = await supabase
        .from("products")
        .select("slug, status")
        .eq("status", "published")
        .limit(1000);

      if (products.error) {
        console.warn("Sitemap product query warning:", products.error.message);
      } else {
        const rows = products.data ?? [];
        rows.forEach((product) => {
          if (product.slug) {
            urls.push(`/product/${product.slug}`);
          }
        });
      }
    } catch (error) {
      console.warn("Sitemap failed to fetch products:", error.message);
    }
  } else {
    console.warn("Supabase environment variables not found; generating sitemap with static routes only.");
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(formatUrl)
    .join("\n")}\n</urlset>`;

  fs.writeFileSync(outputPath, sitemap, "utf-8");
  console.log(`Generated sitemap with ${urls.length} URLs to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
