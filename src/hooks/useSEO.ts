import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
}

const SITE_NAME = "Shuttleboard";
const DEFAULT_DESCRIPTION = "Find badminton tournaments, leagues, and open play sessions across the Philippines.";

export default function useSEO({ title, description = DEFAULT_DESCRIPTION }: SEOProps) {
  useEffect(() => {
    // Set title
    const fullTitle = title === SITE_NAME 
      ? `${SITE_NAME} - PH Badminton Events Directory` 
      : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Set OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", fullTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }
  }, [title, description]);
}