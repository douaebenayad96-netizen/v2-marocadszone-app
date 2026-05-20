import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HomeHero from "../components/layouts/HomeHero";
import HomeInfo from "../components/layouts/HomeInfo";
import HomeJobOffers from "../components/layouts/HomeJobOffers";
import HomePaginatedAnnonces from "../components/layouts/HomePaginatedAnnonces";
import HomePrestatairesCat from "../components/layouts/HomePrestatairesCat";
import HomeShorts from "../components/layouts/HomeShorts";
import SEOHead from "../components/seo/SEOHead";
import { getHomeSEO } from "../utils/seoMetadata";

const IndexPage = () => {
  const { i18n } = useTranslation();
  const [seo, setSeo] = useState(getHomeSEO());

  // Mettre à jour le SEO quand la langue change
  useEffect(() => {
    const handleLanguageChange = () => {
      setSeo(getHomeSEO());
    };
    
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <div className="overflow-auto pb-16">
      <SEOHead
        title={seo.title}
        description={seo.description}
        path="/"
      />
      <HomeHero />
      <HomePrestatairesCat />
      <HomeShorts />
      <HomePaginatedAnnonces />
      <HomeJobOffers />
      <HomeInfo />
    </div>
  );
};

export default IndexPage;