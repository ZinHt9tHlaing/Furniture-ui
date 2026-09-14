import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
}

function SEOHead({
  title,
  description = "Furniture Store",
  image = "/default-og-image.jpg",
  type = "website",
  url = typeof window !== "undefined" ? window.location.href : "", // URL of the current page for SSR and CSR
}: SEOHeadProps) {
  const fullTitle = `${title} | Furniture Store`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph tags (Facebook, LinkedIn) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default SEOHead;
