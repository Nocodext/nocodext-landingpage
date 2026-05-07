import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  pathname?: string;
  image?: string;
  noindex?: boolean;
  type?: string;
}

const SITE_URL = "https://nocodext-landingpage.lovable.app";
const DEFAULT_IMAGE = "https://nocodext-landingpage.lovable.app/favicon.ico";

export const PageSEO = ({
  title,
  description,
  pathname = "",
  image = DEFAULT_IMAGE,
  noindex = false,
  type = "website",
}: SEOProps) => {
  const canonical = `${SITE_URL}${pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};

export default PageSEO;
