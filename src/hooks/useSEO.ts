import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

const SITE_NAME = "Shuttleboard";
const DEFAULT_DESCRIPTION = "Find badminton tournaments, leagues, and open play sessions across the Philippines.";
const DEFAULT_IMAGE = "https://www.shuttleboard.ph/og-image.jpg";
const BASE_URL = "https://www.shuttleboard.ph";

export default function useSEO({ 
  title, 
  description = DEFAULT_DESCRIPTION,
  keywords,
  image,
  url,
  type = "website",
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    // Set title
    const fullTitle = title === SITE_NAME 
      ? `${SITE_NAME} — PH Badminton Events Directory` 
      : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const fullImage = image || DEFAULT_IMAGE;
    const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;

    // Helper function to update or create meta tags
    const setMetaTag = (attribute: string, value: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Primary Meta Tags
    setMetaTag("name", "title", fullTitle);
    setMetaTag("name", "description", description);
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }
    
    // Robots meta tag
    setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    // Open Graph / Facebook
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:url", fullUrl);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", fullImage);

    // Twitter
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:url", fullUrl);
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", fullImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

  }, [title, description, keywords, image, url, type, noindex]);
}