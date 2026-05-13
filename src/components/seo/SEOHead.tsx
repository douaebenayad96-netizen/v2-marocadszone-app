import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

type SEOHeadProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

const SITE_URL = "https://marocadszone.com";
const SITE_NAME = "MarocAdsZone";
const DEFAULT_IMAGE = `${SITE_URL}/favicon.ico`;

const getAbsoluteUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

const SEOHead = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
}: SEOHeadProps) => {
  const location = useLocation();
  const canonicalUrl = getAbsoluteUrl(path || `${location.pathname}${location.search}`);
  const imageUrl = getAbsoluteUrl(image);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEOHead;
