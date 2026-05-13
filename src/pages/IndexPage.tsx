import HomeHero from "../components/layouts/HomeHero";
import HomeInfo from "../components/layouts/HomeInfo";
import HomeJobOffers from "../components/layouts/HomeJobOffers";
import HomePaginatedAnnonces from "../components/layouts/HomePaginatedAnnonces";
import HomePrestatairesCat from "../components/layouts/HomePrestatairesCat";
import HomeShorts from "../components/layouts/HomeShorts";
import SEOHead from "../components/seo/SEOHead";

const IndexPage = () => {
  return (
    <div className="overflow-auto pb-16">
      <SEOHead
        title="Petites annonces gratuites au Maroc : voitures, immobilier, mode, emploi - MarocAdsZone"
        description="Trouvez et publiez vos annonces gratuites au Maroc : immobilier, voiture, motos, informatique, mode, maison, emploi..."
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
